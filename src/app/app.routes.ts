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
        path: 'create-user',
        loadComponent: () => import('./pages/user-form/user-form.component')
      }
    ]
  }
];
