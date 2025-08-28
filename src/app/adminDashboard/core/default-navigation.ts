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
      {
        id: 'type-events',
        title: 'Tipos de eventos',
        type: 'collapsable',
        children: [
          {
            id: 'list',
            title: 'Listado de tipos de eventos',
            type: 'basic',
            link: '/admin/type-events',
          },
          {
            id: 'create',
            title: 'Crear tipo de evento',
            type: 'basic',
            link: '/admin/create-type-event',
          },
        ],
      },
      {
        id: 'organizations',
        title: 'Organizaciones',
        type: 'collapsable',
        children: [
          {
            id: 'list',
            title: 'Listado de organizaciones',
            type: 'basic',
            link: '/admin/organizations',
          },
          {
            id: 'create',
            title: 'Crear organización',
            type: 'basic',
            link: '/admin/create-organization',
          },
        ],
      },
      {
        id: 'users',
        title: 'Usuarios',
        type: 'collapsable',
        children: [
          {
            id: 'list',
            title: 'Listado de usuarios',
            type: 'basic',
            link: '/admin/users',
          },
          {
            id: 'create',
            title: 'Crear Usuario',
            type: 'basic',
            link: '/admin/create-user',
          },
        ],
      },
    ],
  },
];
