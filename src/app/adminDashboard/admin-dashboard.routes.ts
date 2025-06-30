import { Routes } from '@angular/router';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/events-admin/events-admin').then(
            (m) => m.EventsAdmin
          ),
      },
      {
        path: '**',
        redirectTo: 'events',
      },
    ],
  },
];

export default adminDashboardRoutes;
