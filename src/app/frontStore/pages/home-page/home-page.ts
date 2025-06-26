import { Component, inject } from '@angular/core';
import { EventCard } from '../../../event/components/event-card/event-card';
import { EventService } from '../../../event/services/event-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [EventCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly _eventService = inject(EventService);

  public eventsResource = rxResource({
    stream: () => this._eventService.getEvents(),
  });
}
