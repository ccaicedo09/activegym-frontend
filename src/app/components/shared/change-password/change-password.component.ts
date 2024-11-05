import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export default class ChangePasswordComponent implements OnInit {
  userName: string = localStorage.getItem('userName') || '';
  changePasswordForm !: FormGroup;

  private loginService = inject(LoginService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    })
  }

  changePassword() {
    if (this.changePasswordForm?.invalid) {
      this.changePasswordForm.markAllAsTouched()
      return;
    } else if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return
    }

    const { oldPassword, newPassword } = this.changePasswordForm.value;
    this.loginService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        alert('Contraseña cambiada con éxito');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Error al cambiar la contraseña');
        console.error(error);
      }
    })
  }
}
