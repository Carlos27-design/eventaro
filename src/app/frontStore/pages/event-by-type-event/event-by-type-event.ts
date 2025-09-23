import { Component, computed, inject } from '@angular/core';
import { EventService } from '../../../event/services/event-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { EventCard } from '../../../event/components/event-card/event-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-event-by-type-event',
  imports: [EventCard, RouterLink],
  templateUrl: './event-by-type-event.html',
  styleUrl: './event-by-type-event.css',
})
export class EventByTypeEvent {
  private readonly _eventService = inject(EventService);
  private readonly _route = inject(ActivatedRoute);

  public readonly typeEventName = toSignal(
    this._route.paramMap.pipe(map((params) => params.get('name') ?? '')),
    { initialValue: '' }
  );

  public eventsResource = rxResource({
    params: () => ({ name: this.typeEventName() }),
    stream: ({ params }) =>
      this._eventService.getEventsByTypeEvent(params.name),
  });
}
