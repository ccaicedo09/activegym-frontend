import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TranslateModule, MatTooltipModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
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
        complete: () => {
          this.router.navigateByUrl('/dashboard');
          this.adminLoginForm.reset();
        }
      })
    } else {
      this.adminLoginForm.markAllAsTouched();
    }
  }
}
