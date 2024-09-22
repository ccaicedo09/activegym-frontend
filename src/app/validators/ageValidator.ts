import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age < minAge ? { 'ageInvalid': true } : null;
    }

    return age < minAge ? { 'ageInvalid': true } : null;
  };
}
