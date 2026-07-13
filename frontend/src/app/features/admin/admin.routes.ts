import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => {
      return import('../admin/components/dashboard/dashboard').then((m) => m.Dashboard);
    },
  },
];
