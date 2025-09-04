import { Component, inject, signal } from '@angular/core';
import { TypeEvent } from '../../../typeEvent/interfaces/type-event';
import { TypeEventService } from '../../../typeEvent/services/type-event-data';
import { Router, RouterLink } from '@angular/router';
import { AuthData } from '../../../auth/services/auth-data';

@Component({
  selector: 'app-front-navbar',
  imports: [RouterLink],
  templateUrl: './front-navbar.html',
  styleUrl: './front-navbar.css',
})
export class FrontNavbar {
  private readonly _typeEventService = inject(TypeEventService);

  public readonly authService = inject(AuthData);

  private readonly _router = inject(Router);

  public routes = signal<TypeEvent[]>([]);

  ngOnInit() {
    this.getTypeEvents();
  }

  private getTypeEvents(): void {
    this._typeEventService.getTypeEvents().subscribe({
      next: (resp) => this.routes.set(resp),
      error: (error) => console.error(error),
    });
  }

  public logout() {
    this.authService.logout();
    this._router.navigate(['/']);
  }
}
