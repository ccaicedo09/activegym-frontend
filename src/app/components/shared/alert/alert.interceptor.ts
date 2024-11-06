import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { inject } from '@angular/core';

export const alertInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
          alertService.showSuccess('Operación completada con éxito');
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.error) {
        alertService.showError(error.error);
      } else {
        alertService.showError('Ocurrió un error inesperado');
      }
      return throwError(() => error);
    })
  );
};
