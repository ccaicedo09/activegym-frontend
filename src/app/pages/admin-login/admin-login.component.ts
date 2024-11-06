import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest.interface';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export default class AdminLoginComponent {
  loginError: string = "";
  adminLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.adminLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.adminLoginForm.get('email');
  }

  get password() {
    return this.adminLoginForm.get('password');
  }

  login() {
    if(this.adminLoginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.adminLoginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        complete: () => {
          console.info("Login completado!!");
          this.router.navigateByUrl('/dashboard');
          this.adminLoginForm.reset();
        }
      })
    } else {
      this.adminLoginForm.markAllAsTouched();
    }
  }
}
