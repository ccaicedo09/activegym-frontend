import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {

  const loginService = inject(LoginService);
  const token = loginService.getUserToken();
  const router = inject(Router);

  try {
    if (token) {
      const isValid = await firstValueFrom(loginService.validateToken(token));
      if (isValid) {
        return true;
      } else {
        localStorage.removeItem('token');
      }
    }
  } catch (error) {
    console.error('Error validating token', error);
    localStorage.removeItem('token');
  }

  router.navigate(['/login/admin'], { queryParams: { returnUrl: state.url } });
  return false;

};
