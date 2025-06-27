import { Component, computed, inject, signal } from '@angular/core';
import { EventDetail } from '../../../event/components/event-detail/event-detail';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../event/services/event-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-page',
  imports: [EventDetail],
  templateUrl: './event-page.html',
  styleUrl: './event-page.css',
})
export class EventPage {
  private readonly _route = inject(ActivatedRoute);
  private readonly _eventService = inject(EventService);

  public readonly eventId = signal(this._route.snapshot.params['id']);

  public eventResource = rxResource({
    params: () => ({ id: this.eventId() }),
    stream: ({ params }) => this._eventService.getEventById(params.id),
  });
}
