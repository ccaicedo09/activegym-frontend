import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // General access routes
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'plans',
    loadComponent: () => import('./pages/plans/plans.component')
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
  },

  // Protected dashboard routes
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/shared/welcome-view/welcome-view.component')
      },
      {
        path: 'analytics',
        loadComponent: () => import('./components/management/analytics/analytics.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'user-form',
        loadComponent: () => import('./components/management/user-form/user-form.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'memberships-list',
        loadComponent: () => import('./components/management/memberships-list/memberships-list.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'my-memberships',
        loadComponent: () => import('./components/management/memberships-list/memberships-list.component'),
      },
      {
        path: 'users',
        loadComponent: () => import('./components/management/user-list/user-list.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'users/:document',
        loadComponent: () => import('./components/management/user-details/user-details.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/shared/user-profile/user-profile.component')
      },
      {
        path: 'gymconfig',
        loadComponent: () => import('./components/admin/gym-config/gym-config.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR'] }
      },
      {
        path: 'change-password',
        loadComponent: () => import('./components/shared/change-password/change-password.component')
      },
      {
        path: 'admin-change-password',
        loadComponent: () => import('./components/admin/admin-change-password/admin-change-password.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR'] }
      },
      {
        path: 'transfer-membership',
        loadComponent: () => import('./components/management/transfer-membership/transfer-membership.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      },
      {
        path: 'freeze-membership',
        loadComponent: () => import('./components/management/freeze-membership/freeze-membership.component'),
        canActivate: [roleGuard],
        data: { requiredRoles: ['ADMINISTRADOR', 'ASESOR'] }
      }
    ]
  },

  // Error routes
  {
    path: 'forbidden',
    loadComponent: () => import('./pages/forbidden/forbidden.component')
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound/notfound.component')
  }
];
