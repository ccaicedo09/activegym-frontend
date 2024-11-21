import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink, MatTooltipModule, TranslateModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export default class ChangePasswordComponent implements OnInit {
  userName: string = localStorage.getItem('userName') || '';
  changePasswordForm!: FormGroup;

  private loginService = inject(LoginService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  getPasswordErrors() {
    const password = this.changePasswordForm.get('newPassword');
    if (!password) return [];

    const errors = [];
    if (password.hasError('required') && password.touched) {
      errors.push(this.translate.instant('changePassword.passwordIsRequired'));
    }
    if (password.hasError('minlength')) {
      errors.push(this.translate.instant('changePassword.atLeast8Characters'));
    }
    if (password.hasError('pattern')) {
      errors.push(this.translate.instant('changePassword.pattern'));
    }
    return errors;
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.changePasswordForm.value;
    this.loginService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
