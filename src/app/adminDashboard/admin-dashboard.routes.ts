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
          import('./pages/event-page/events-admin/events-admin').then(
            (m) => m.EventsAdmin
          ),
      },
      {
        path: 'create-event',
        loadComponent: () =>
          import('./pages/event-page/event-create/event-create').then(
            (m) => m.EventCreate
          ),
      },
      {
        path: 'update-event/:id',
        loadComponent: () =>
          import('./pages/event-page/update-event/update-event').then(
            (m) => m.UpdateEvent
          ),
      },
      {
        path: 'type-events',
        loadComponent: () =>
          import(
            './pages/type-event-page/type-events-admin/type-events-admin'
          ).then((m) => m.TypeEventsAdmin),
      },
      {
        path: 'create-type-event',
        loadComponent: () =>
          import(
            './pages/type-event-page/type-event-create/type-event-create'
          ).then((m) => m.TypeEventCreate),
      },
      {
        path: 'update-type-event/:id',
        loadComponent: () =>
          import(
            './pages/type-event-page/type-event-update/type-event-update'
          ).then((m) => m.TypeEventUpdate),
      },
      {
        path: '**',
        redirectTo: 'events',
      },
    ],
  },
];

export default adminDashboardRoutes;
