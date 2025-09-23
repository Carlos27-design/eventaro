import { Component, inject } from '@angular/core';
import { TypeEventTable } from '../../../../typeEvent/components/type-event-table/type-event-table';
import { TypeEventService } from '../../../../typeEvent/services/type-event-data';
import { rxResource } from '@angular/core/rxjs-interop';
import { TypeEvent } from '../../../../typeEvent/interfaces/type-event';

@Component({
  selector: 'app-type-events-admin',
  imports: [TypeEventTable],
  templateUrl: './type-events-admin.html',
  styleUrl: './type-events-admin.css',
})
export class TypeEventsAdmin {
  private readonly _typeEventService = inject(TypeEventService);

  public typeEventResource = rxResource<TypeEvent[], unknown>({
    stream: () => this._typeEventService.getTypeEvents(),
  });

  public reloadTypeEvents() {
    this.typeEventResource.reload();
  }
}
