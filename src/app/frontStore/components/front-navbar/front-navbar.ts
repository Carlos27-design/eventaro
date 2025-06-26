import { Component, inject, signal } from '@angular/core';
import { TypeEvent } from '../../../typeEvent/interfaces/type-event';
import { TypeEventService } from '../../../typeEvent/services/type-event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-front-navbar',
  imports: [RouterLink],
  templateUrl: './front-navbar.html',
  styleUrl: './front-navbar.css',
})
export class FrontNavbar {
  private readonly _typeEventService = inject(TypeEventService);

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
}
