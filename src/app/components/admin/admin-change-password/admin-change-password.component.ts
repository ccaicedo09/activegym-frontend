import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-change-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TranslateModule],
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.css'
})
export default class AdminChangePasswordComponent implements OnInit {
  adminChangePasswordForm!: FormGroup;

  private usersService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.adminChangePasswordForm = this.formBuilder.group({
      document: ['', [Validators.required, Validators.min(1)]],
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
    const password = this.adminChangePasswordForm.get('newPassword');
    if (!password) return [];

    const errors = [];
    if (password.hasError('required') && password.touched) {
      errors.push(this.translate.instant("changePassword.passwordIsRequired"));
    }
    if (password.hasError('minlength')) {
      errors.push(this.translate.instant("changePassword.atLeast8Characters"));
    }
    if (password.hasError('pattern')) {
      errors.push(this.translate.instant("changePassword.pattern"));
    }
    return errors;
  }

  changeUserPassword() {
    if (this.adminChangePasswordForm.invalid) {
      this.adminChangePasswordForm.markAllAsTouched();
      return;
    }

    const { document, newPassword } = this.adminChangePasswordForm.value;

    this.usersService.adminChangePassword(document, newPassword).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
