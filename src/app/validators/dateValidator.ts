import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para la fecha mínima
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const inputDate = new Date(control.value);
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return inputDate >= today ? null : { minDate: true };
  };
}
