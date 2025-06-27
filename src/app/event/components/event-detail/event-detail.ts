import { Component, input } from '@angular/core';
import { Event } from '../../interfaces/event';
import { DatePipe, SlicePipe } from '@angular/common';
import { EventImagePipe } from '../../pipes/event-image-pipe';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, EventImagePipe],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  public event = input.required<Event>();
}
