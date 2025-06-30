import { NavItem } from './navigation-item.interface';

export const defaultNavigation: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'home',
        link: '/dashboard',
      },
      {
        id: 'socio-moroso',
        title: 'Socios Morosos',
        type: 'basic',
        icon: 'people',
        link: '/socio-moroso',
      },
    ],
  },
];
