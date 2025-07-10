import { NavItem } from './navigation-item.interface';

export const defaultNavigation: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Gestion',
    type: 'collapsable',
    children: [
      {
        id: 'events',
        title: 'Eventos',
        type: 'collapsable',
        children: [
          {
            id: 'list',
            title: 'Listado de eventos',
            type: 'basic',
            link: '/admin/events',
          },
          {
            id: 'create',
            title: 'Crear evento',
            type: 'basic',
            link: '/admin/create-event',
          },
        ],
      },
    ],
  },
];
