import { EventImagePipe } from './../../../event/pipes/event-image-pipe';
import { Component, effect, input } from '@angular/core';
import { Inscription } from '../../interfaces/inscription.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-inscription',
  imports: [DatePipe, EventImagePipe],
  templateUrl: './list-inscription.html',
  styleUrl: './list-inscription.css',
})
export class ListInscription {
  public inscription = input<Inscription>();

  constructor() {
    effect(() => {
      console.log(this.inscription());
    });
  }
}
