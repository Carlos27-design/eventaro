import { Component, computed, inject, input, signal } from '@angular/core';
import { Events } from '../../interfaces/event';
import { DatePipe } from '@angular/common';
import { EventImagePipe } from '../../pipes/event-image-pipe';
import { AuthData } from '../../../auth/services/auth-data';
import { InscriptionService } from '../../../inscription/services/inscription-service';
import { Inscription } from '../../../inscription/interfaces/inscription.interfaces';
import { toSignal } from '@angular/core/rxjs-interop';

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

  public alreadyInscribed = signal<boolean>(false);

  public isAuthenticated = computed(
    () => this.authService.authStatus() === 'authenticated'
  );

  public showSnackBar = computed(() => this.snackBarVisible());

  ngOnInit() {
    this.inscriptionService
      .findExistInscription(this.event()!.id)
      .subscribe((exist) => {
        this.alreadyInscribed.set(exist);
      });
  }

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }

  public inscriptionEvent() {
    const today = new Date();

    const inscriptionLike = {
      dateInscription: today,
      eventId: this.event()!.id,
    };

    this.inscriptionService.createInscription(inscriptionLike).subscribe(() => {
      this.showSnackBarNow();
    });
  }
}
