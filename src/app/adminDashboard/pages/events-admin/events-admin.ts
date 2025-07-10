import { Component, inject } from '@angular/core';
import { EventService } from '../../../event/services/event-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { EventTable } from '../../../event/components/event-table/event-table';
import { Events } from '../../../event/interfaces/event';

@Component({
  selector: 'app-events-admin',
  imports: [EventTable],
  templateUrl: './events-admin.html',
  styleUrl: './events-admin.css',
})
export class EventsAdmin {
  private readonly _eventService = inject(EventService);

  public eventsResource = rxResource<Events[], unknown>({
    stream: () => this._eventService.getEvents(),
  });

  public reloadEvents() {
    this.eventsResource.reload();
  }
}
