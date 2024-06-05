import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  
  loginForm! : FormGroup;

  constructor(private formbuilder: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value);

      this.loginService.postData(this.loginForm.value).subscribe(
        (response: any) => {
          sessionStorage.setItem('access_token', response.token);
          console.log('Response from backend: ' , response);
          Swal.fire({
            title: 'Success!',
            text: 'Login Successfully!',
            icon: 'success',
          });
          window.location.replace('/');
        },
        (error) => {
          console.log('Error sending data to backend: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login Failed',
          });
        }
      );

    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
