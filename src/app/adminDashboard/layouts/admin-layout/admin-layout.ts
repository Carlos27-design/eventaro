import { Component } from '@angular/core';
import { AdminNavBar } from '../../components/admin-nav-bar/admin-nav-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminNavBar, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
