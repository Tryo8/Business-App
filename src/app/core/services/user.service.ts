import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UsersResponse } from '../interface/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private _router:Router,private http: HttpClient) { }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.apiUrl);
  };

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  };

  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['/auth/register']);
    this.userSubject.next(null);
  };

  setUser(userData: User): void {
    const user: User = {
      // Include any other fields from API response
      ...userData
    };
    localStorage.setItem('token',JSON.stringify(user.accessToken));
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
