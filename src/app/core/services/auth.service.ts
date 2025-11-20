import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _httpClient:HttpClient) {    this.initializeUser();}
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  authorized(): boolean {
    if( localStorage.getItem('token') !=null || this.isLoggedIn()) {
      return true
    } else return false
  };

  // loginUser(user:any):Observable <any> {
  //   return this._httpClient.post("https://dummyjson.com/user/login",user)
  // };
  // auth.service.ts
   loginUser(user: any): Observable<any> {
    return this._httpClient.post("https://dummyjson.com/auth/login", user).pipe(
      switchMap((authResponse: any) => {
        console.log('Auth success:', authResponse);
        
        // Extract user ID from auth response
        const userId = authResponse.id;
        if (!userId) {
          return throwError(() => new Error('User ID not found in auth response'));
        }
        
        // Get full user profile data
        return this.getUserProfile(userId).pipe(
          map((userProfile: any) => {
            // Combine auth data with user profile
            const completeUserData = {
              token: authResponse.accessToken || authResponse.token,
              authData: authResponse,
              profile: userProfile
            };
            
            // Store the complete user data
            this.setUserData(completeUserData);
            this.currentUserSubject.next(completeUserData);
            
            return completeUserData;
          })
        );
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Get user profile by ID
  getUserProfile(userId: number): Observable<any> {
    return this._httpClient.get(`https://dummyjson.com/users/${userId}`);
  }

  // Store user data in localStorage
  setUserData(userData: any): void {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token);
  }

  // Get stored user data
  getStoredUserData(): any {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken') || localStorage.getItem('token') 
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  private initializeUser(): void {
    const storedUser = this.getStoredUserData();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  // Refresh user data (useful for profile updates)
  refreshUserData(): Observable<any> {
    const currentUser = this.getStoredUserData();
    if (currentUser && currentUser.profile?.id) {
      return this.getUserProfile(currentUser.profile.id).pipe(
        tap((updatedProfile: any) => {
          const updatedUserData = {
            ...currentUser,
            profile: updatedProfile
          };
          this.setUserData(updatedUserData);
          this.currentUserSubject.next(updatedUserData);
        })
      );
    }
    return throwError(() => new Error('No user data available'));
  }

}
