import { Component, computed, inject, input, signal } from '@angular/core';
import { Events } from '../../interfaces/event';
import { DatePipe } from '@angular/common';
import { EventImagePipe } from '../../pipes/event-image-pipe';
import { AuthData } from '../../../auth/services/auth-data';
import { InscriptionService } from '../../../inscription/services/inscription-service';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, EventImagePipe],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  private readonly inscriptionService = inject(InscriptionService);
  private readonly snackBarVisible = signal(false);
  private readonly authService = inject(AuthData);
  public event = input.required<Events>();

  public isAuthenticated = computed(
    () => this.authService.authStatus() === 'authenticated'
  );

  public showSnackBar = computed(() => this.snackBarVisible());

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }

  public inscriptionEvent() {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);

    const dateOnly = new Date(formattedDate);

    const inscriptionLike = {
      dateInscription: dateOnly,
      eventId: this.event()!.id,
    };

    console.log(inscriptionLike);

    this.inscriptionService.createInscription(inscriptionLike).subscribe(() => {
      this.showSnackBarNow();
    });
  }
}
