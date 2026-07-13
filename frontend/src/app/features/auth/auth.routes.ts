import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => {
      return import('../auth/components/login/login').then((m) => m.Login);
    },
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('../auth/components/register/register').then((m) => m.Register);
    },
  },
  {
    path: 'otp',
    loadComponent: () => {
      return import('../auth/components/otp/otp').then((m) => m.Otp);
    },
  },
];
