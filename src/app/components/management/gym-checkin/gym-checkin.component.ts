import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessService } from '../../../services/users/access.service';
import UserOverviewComponent from "../../user-overview/user-overview.component";

@Component({
  selector: 'app-gym-checkin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserOverviewComponent],
  templateUrl: './gym-checkin.component.html',
  styleUrl: './gym-checkin.component.css'
})
export default class GymCheckinComponent {
  private fb = inject(FormBuilder);
  private accessService = inject(AccessService);

  checkinForm: FormGroup = this.fb.group({
    document: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  isLoading = false;
  showResult = false;
  accessGranted = false;
  accessMessage = '';
  document: number | undefined;
  error: string | null = null;

  isFieldInvalid(field: string): boolean {
    const formControl = this.checkinForm.get(field);
    return formControl ? formControl.invalid && formControl.touched : false;
  }

  onSubmit() {
    if (this.checkinForm.valid) {
      this.isLoading = true;
      this.error = null;

      const document = Number(this.checkinForm.get('document')?.value);

      this.accessService.getAccess({ document }).subscribe({
        next: (response) => {
          this.document = document;
          this.accessMessage = response.message;
          this.accessGranted = true;
          this.showResult = true;
          this.isLoading = false;

          // Reset después de 5 segundos
          setTimeout(() => {
            this.resetForm();
          }, 5000);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Usuario no encontrado o error en el sistema';

          // Reset error después de 5 segundos
          setTimeout(() => {
            this.error = null;
          }, 5000);
        }
      });
    } else {
      Object.keys(this.checkinForm.controls).forEach(key => {
        const control = this.checkinForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  private resetForm() {
    this.checkinForm.reset();
    this.showResult = false;
    this.accessGranted = false;
    this.accessMessage = '';
    this.document = undefined;
    this.error = null;
  }
}
