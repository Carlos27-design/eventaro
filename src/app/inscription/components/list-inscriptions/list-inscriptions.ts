import { EventImagePipe } from '../../../event/pipes/event-image-pipe';
import { Component, input } from '@angular/core';
import { Inscription } from '../../interfaces/inscription.interfaces';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-inscription',
  imports: [DatePipe, EventImagePipe, RouterLink],
  templateUrl: './list-inscriptions.html',
  styleUrl: './list-inscriptions.css',
})
export class ListInscription {
  public inscription = input<Inscription>();
}
