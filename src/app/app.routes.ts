import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'plans',
    loadComponent: () => import('./pages/plans/plans.component')
  },
  {
    path:'login/admin',
    loadComponent: () => import('./pages/admin-login/admin-login.component')
  },
  {
    path:'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'user-form',
        loadComponent: () => import('./components/user-form/user-form.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR']}
      },
      {
        path: 'memberships-list',
        loadComponent: () => import('./components/memberships-list/memberships-list.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR']}
      },
      {
        path: 'users',
        loadComponent: () => import('./components/user-list/user-list.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR']}
      },
      {
        path: 'users/:document',
        loadComponent: () => import('./components/user-details/user-details.component')
      },
      {
        path: 'gymconfig',
        loadComponent: () => import('./components/gym-config/gym-config.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR']}
      }
    ]
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./pages/forbidden/forbidden.component')
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound/notfound.component')
  }
];
