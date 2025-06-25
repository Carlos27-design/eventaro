import { Routes } from '@angular/router';

export const frontStoreRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/store-front-layout/store-front-layout').then(
        (m) => m.StoreFrontLayout
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page').then((m) => m.HomePage),
      },
      {
        path: 'event/:id',
        loadComponent: () =>
          import('./pages/event-page/event-page').then((m) => m.EventPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default frontStoreRoutes;
