import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => {
          return import('../admin/components/dashboard/dashboard').then((m) => m.Dashboard);
        },
        canActivate:[authGuard]
      },
      {
        path: 'products',
        loadComponent: () => {
          return import('../admin/components/product/product').then((m) => m.Product);
        },
        canActivate:[authGuard]
      },
      {
        path: 'stores',
        loadComponent: () => {
          return import('../admin/components/store/store').then((m) => m.Store);
        },
        canActivate:[authGuard]
      },
      {
        path: 'stocks',
        loadComponent: () => {
          return import('../admin/components/stock/stock').then((m) => m.Stock);
        },
        canActivate:[authGuard]
      },
    ],
  },
];
