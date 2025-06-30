import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./adminDashboard/admin-dashboard.routes').then(
        (m) => m.adminDashboardRoutes
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./frontStore/front-store.routes').then((m) => m.frontStoreRoutes),
  },
];
