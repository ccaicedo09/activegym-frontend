import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export default class AdminLoginComponent {
  adminLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.adminLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], [this.asyncEmailValidator()]],
      password: ['', Validators.required]
    });
  }

  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(1000), // Simula una llamada a un servicio remoto
        map(value => {
          const emailTaken = value === 'test@example.com'; // Simula una verificación de email
          return emailTaken ? { emailTaken: true } : null;
        })
      );
    };
  }

  // Test purpose routing

  get email() {
    return this.adminLoginForm.get('email');
  }

  get password() {
    return this.adminLoginForm.get('password');
  }

  login() {
    if(this.adminLoginForm.valid) {
      this.router.navigateByUrl('/dashboard');
      this.adminLoginForm.reset();
    } else {
      this.adminLoginForm.markAllAsTouched();
      alert('Please enter valid email and password');
    }
  }
}
