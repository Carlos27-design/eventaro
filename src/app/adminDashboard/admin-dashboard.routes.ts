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
        path: 'organizations',
        loadComponent: () =>
          import(
            './pages/organization/organizations-page/organizations-page'
          ).then((m) => m.OrganizationsPage),
      },
      {
        path: 'create-organization',
        loadComponent: () =>
          import(
            './pages/organization/organization-create-page/organization-create-page'
          ).then((m) => m.OrganizationCreatePage),
      },
      {
        path: 'update-organization/:id',
        loadComponent: () =>
          import(
            './pages/organization/organization-update-page/organization-update-page'
          ).then((m) => m.OrganizationUpdatePage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/user/user-admin/user-admin').then((m) => m.UserAdmin),
      },
      {
        path: 'create-user',
        loadComponent: () =>
          import('./pages/user/create-user/create-user').then(
            (m) => m.CreateUser
          ),
      },
      {
        path: 'update-user/:id',
        loadComponent: () =>
          import('./pages/user/update-user/update-user').then(
            (m) => m.UpdateUser
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
