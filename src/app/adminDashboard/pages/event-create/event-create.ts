import { Component } from '@angular/core';
import { FormEventCreate } from '../../../event/components/form-event-create/form-event-create';

@Component({
  selector: 'app-event-create',
  imports: [FormEventCreate],
  templateUrl: './event-create.html',
  styleUrl: './event-create.css',
})
export class EventCreate {}
