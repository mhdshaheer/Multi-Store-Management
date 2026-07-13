import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'auth',
    loadChildren: () => {
      return import('../app/features/auth/auth.routes').then((m) => m.AUTH_ROUTES);
    },
  },
  {
    path: 'admin',
    loadChildren: () => {
      return import('../app/features/admin/admin.routes').then((m) => m.ADMIN_ROUTES);
    },
  },
];
