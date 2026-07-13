import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

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
      },
      {
        path: 'products',
        loadComponent: () => {
          return import('../admin/components/product/product').then((m) => m.Product);
        },
      },
    ],
  },
];
