import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../core/navigation-item.interface';
import { defaultNavigation } from '../../core/default-navigation';

@Component({
  selector: 'admin-nav-bar',
  imports: [RouterLink],
  templateUrl: './admin-nav-bar.html',
  styleUrl: './admin-nav-bar.css',
})
export class AdminNavBar {
  navigation: NavItem[] = defaultNavigation;

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
