import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { inject } from '@angular/core';

export const alertInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error) {
        alertService.showError(error.error);
      } else {
        alertService.showError('An unexpected error occurred');
      }
      return throwError(() => error);
    })
  );
};
