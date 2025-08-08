import { Component } from '@angular/core';
import { TypeEventFormCreate } from '../../../../typeEvent/components/type-event-form-create/type-event-form-create';

@Component({
  selector: 'app-type-event-create',
  imports: [TypeEventFormCreate],
  templateUrl: './type-event-create.html',
  styleUrl: './type-event-create.css',
})
export class TypeEventCreate {}
