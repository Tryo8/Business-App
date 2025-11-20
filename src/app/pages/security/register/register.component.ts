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
@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private _router:Router){
    this.initFormControls();
    this.initFormGroup();
  }

  txtPassword: boolean = false;
  showPassword(){
    this.txtPassword = !this.txtPassword
  };

  isSubmitting:boolean = false;
  formError:boolean= false;
  // FROM CONTROL
  username!:  FormControl;
  email!:     FormControl;
  password!:  FormControl;
  birthDate!: FormControl;
  position!:  FormControl;
  //FORM GROUP
  registerForm!: FormGroup;

  initFormControls(): void {
    this.username = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(33)]);
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.password = new FormControl('',[Validators.required]);
    this.birthDate = new FormControl('',[Validators.required]);
    this.position = new FormControl('',[Validators.required]);
  };

  initFormGroup(): void {
    this.registerForm = new FormGroup(({
      username:  this.username,
      email:     this.email,
      password:  this.password,
      birthDate: this.birthDate,
      position:  this.position
    }))
  };

  onRegisterFormSubmit(){
    if(this.isSubmitting) return;
    this.isSubmitting = true;

    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.isSubmitting = false;

    } else {
      this.isSubmitting = false;
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsDirty()
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsDirty();
      });
      this.formError = true;
    }
  };


  /*** skip register ******/
  skip(){
    const token = 'SECRET TOKEN'
    localStorage.setItem('token',token);

    this._router.navigate(['/user/home']);

  }





}
