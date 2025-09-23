export type NavItemType = 'group' | 'collapsable' | 'basic';

export interface NavItem {
  id: string;
  title: string;
  subtitle?: string;
  type: NavItemType;
  icon?: string;
  link?: string;
  children?: NavItem[];
}
