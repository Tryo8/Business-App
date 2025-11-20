import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../core/interface/User';
import { AuthService } from '../../../core/services/auth.service';
import { stringify } from 'uuid';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    AutoFocusModule,
    FloatLabelModule,
    DatePickerModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private _router:Router,
    private _auth:AuthService,private _userService:UserService)
    {

    this.initFormControls();
    this.initFormGroup();
  }

  txtPassword: boolean = false;
  showPassword(){
    this.txtPassword = !this.txtPassword
  };

  isSubmitting:boolean = false;
  formErrorFields:boolean= false;
  formErrorLogin:boolean = false;
  // FROM CONTROL
  username!:  FormControl;
  email!:     FormControl;
  password!:  FormControl;
  //FORM GROUP
  loginForm!: FormGroup;

  initFormControls(): void {
    this.username = new FormControl('emilys',[Validators.required,Validators.minLength(3),Validators.maxLength(33)]);
    this.email = new FormControl('emily.johnson@x.dummyjson.com',[Validators.required,Validators.email]);
    this.password = new FormControl('emilyspass',[Validators.required]);
  };

  initFormGroup(): void {
    this.loginForm = new FormGroup(({
      username:  this.username,
      email:     this.email,
      password:  this.password,
    }))
  };

  onLoginFormSubmit(){
    if(this.isSubmitting) return;
    this.isSubmitting = true;

    const userData = {
      username: this.loginForm.value.username,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    
    if(this.loginForm.valid){
      this._auth.loginUser(userData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          console.log('Login successful', response);

          localStorage.setItem('token', response.accessToken);
          this._userService.setUser(response);
          this._router.navigate(['/user/home']); // Redirect after login
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formErrorLogin = true;
          console.error('Login failed', error);
          this.isSubmitting = false;
          Object.values(this.loginForm.controls).forEach(control => {
            control.markAsDirty();
          });
        }
      });
    } else {
      this.isSubmitting = false;
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty()
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
      });
      this.formErrorFields = true;
    }
  };




}
