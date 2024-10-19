import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { firstValueFrom } from 'rxjs';

export const roleGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const requiredRoles = route.data['requiredRoles'] as Array<string>;

  try {
    const roles = await firstValueFrom(loginService.getRoles());
    const hasRole = requiredRoles.some(role => roles.includes(role));

    if (hasRole) {
      return true;
    }
  } catch (e) {
    console.error('Error validating role', e);
  }

  router.navigate(['forbidden']);
  return false;
};
