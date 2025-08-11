import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../core/navigation-item.interface';
import { defaultNavigation } from '../../core/default-navigation';
import { CommonModule } from '@angular/common';
import { AuthData } from '../../../auth/services/auth-data';

@Component({
  selector: 'admin-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-nav-bar.html',
  styleUrl: './admin-nav-bar.css',
})
export class AdminNavBar {
  public readonly authService = inject(AuthData);
  navigation: NavItem[] = defaultNavigation;
  collapsedItems = new Set<string>();

  toggleCollapse(item: NavItem) {
    if (this.collapsedItems.has(item.id)) {
      this.collapsedItems.delete(item.id);
    } else {
      this.collapsedItems.add(item.id);
    }
  }

  get flatLinks(): NavItem[] {
    const flatten = (items: NavItem[]): NavItem[] => {
      return items.flatMap((item) => {
        if (item.type === 'basic') return [item];
        if (item.children) return flatten(item.children);
        return [];
      });
    };
    return flatten(this.navigation);
  }
}
