import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TypeEvent } from '../../../../typeEvent/interfaces/type-event';
import { TypeEventService } from '../../../../typeEvent/services/type-event-data';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEventFormUpdate } from '../../../../typeEvent/components/type-event-form-update/type-event-form-update';

@Component({
  selector: 'app-type-event-update',
  imports: [TypeEventFormUpdate],
  templateUrl: './type-event-update.html',
  styleUrl: './type-event-update.css',
})
export class TypeEventUpdate {
  public typeEventId = signal<string>('');

  private readonly _typeEventService = inject(TypeEventService);
  private readonly _route = inject(ActivatedRoute);

  constructor() {
    this.typeEventId.set(this._route.snapshot.params['id']);
  }

  public typeEventResource = rxResource({
    params: () => ({ id: this.typeEventId() }),
    stream: ({ params }) => this._typeEventService.getTypeEventById(params.id),
  });
}
