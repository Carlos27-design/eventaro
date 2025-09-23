import { Component } from '@angular/core';

import { FormEventCreateOrganizer } from '../../../event/components/form-event-create-organizer/form-event-create-organizer';

@Component({
  selector: 'app-create-event-page',
  imports: [FormEventCreateOrganizer],
  templateUrl: './create-event-page.html',
  styleUrl: './create-event-page.css',
})
export class CreateEventPage {}
