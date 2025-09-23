import { Component, inject, signal } from '@angular/core';
import { FormUpdateEvents } from '../../../../event/components/form-update-events/form-update-events';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { EventService } from '../../../../event/services/event-service';

@Component({
  selector: 'app-update-event',
  imports: [FormUpdateEvents],
  templateUrl: './update-event.html',
  styleUrl: './update-event.css',
})
export class UpdateEvent {
  public eventId = signal<string>('');

  private readonly _eventService = inject(EventService);
  private readonly _route = inject(ActivatedRoute);

  constructor() {
    this.eventId.set(this._route.snapshot.params['id']);
  }

  public eventResource = rxResource({
    params: () => ({ id: this.eventId() }),
    stream: ({ params }) => this._eventService.getEventById(params.id),
  });
}
