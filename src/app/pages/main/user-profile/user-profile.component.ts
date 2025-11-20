import { Component } from '@angular/core';
import { User } from '../../../core/interface/User';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(private _userService: UserService, private _router:ActivatedRoute, private _route:Router) { }

  users: User[] = [];
  loading = false;
  error = '';
  usersDetails: User  | null = null

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      const userId = params['id'];
      this.getUserDetails(userId);
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this._userService.getUsers().subscribe({
      next: (response) => {
        this.loading = false;
        this.users = response.users;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Oops something went wrong!';
        console.error('Error loading users:', error);
      }
    });
  };

  getUserDetails(id: number): void {
    this.loading = true;
    this._userService.getUserById(id).subscribe({
      next:(res) => {
        this.loading = false;
        this.usersDetails = res;
        this._route.navigate([`/user/employees/${id}`]);
      },
      error: (err) => {
        this.loading = false;
        console.log('Error loading user detials:' , err);
      }
    })
  };
}
