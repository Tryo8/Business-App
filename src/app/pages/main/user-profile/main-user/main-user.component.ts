import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interface/User';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-main-user',
  imports: [],
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.scss'
})
export class MainUserComponent {
  constructor(
    private _authService:AuthService)
  {}

  user: User | null = null;
  loading: boolean = false;
  error = '';

  ngOnInit(): void {
    const storedUser = this._authService.getStoredUserData();
    if (storedUser && storedUser.profile?.id) {
      const id = storedUser.profile.id;
      console.log("Loaded ID:", id);
      this.getUserInfo(id);
    } else {
      console.log("No user found in storage");
    }
  }

  getUserInfo(id:number):void {
    this.loading = true;
    this._authService.getUserProfile(id).subscribe({
      next: (res) => {
        this.user = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error loading user:', err);
        this.loading = false;
        this.error = 'Oops something went wrong';
      }
    })
  };

  

}
