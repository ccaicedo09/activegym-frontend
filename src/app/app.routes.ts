import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path:'login/admin',
    loadComponent: () => import('./pages/admin-login/admin-login.component')
  },
  {
    path:'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'user-form',
        loadComponent: () => import('./components/user-form/user-form.component')
      },
      {
        path: 'users',
        loadComponent: () => import('./components/user-list/user-list.component')
      },
      {
        path: 'users/:document',
        loadComponent: () => import('./components/user-details/user-details.component')
      }
    ]
  }
];
