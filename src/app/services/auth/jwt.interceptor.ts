import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);

  const token = loginService.getUserToken();

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq);
};
