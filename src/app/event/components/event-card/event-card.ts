import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventImagePipe } from '../../pipes/event-image-pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'event-card',
  imports: [RouterLink, EventImagePipe, SlicePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  public event = input.required<Event>();
}
