import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interface/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-user',
  imports: [],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.scss'
})
export class GetUserComponent {
  constructor( private _userService:UserService, private _router:ActivatedRoute){}
  loading = false;
  error = '';
  usersDetails: User  | null = null

  ngOnInit(): void{
    const id = this._router.snapshot.params['id'];
    this.getUserDetails(id)
  }
  getUserDetails(id: number): void {
    this.loading = true;
    this._userService.getUserById(id).subscribe({
      next: (res) => {
        this.usersDetails = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Oops something went wrong!'
        console.log('Error loadin detials:', err)
      }
    })
  };





}
