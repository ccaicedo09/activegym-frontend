import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './services/auth/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { alertInterceptor } from './components/shared/alert/alert.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor, alertInterceptor])
    ), provideAnimationsAsync(),
  ]
};
