import { Component, computed, inject, signal } from '@angular/core';
import { AuthData } from '../../../auth/services/auth-data';
import { User } from '../../../auth/interfaces/user';
import { InscriptionService } from '../../../inscription/services/inscription-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ListInscription } from '../../../inscription/components/list-inscriptions/list-inscriptions';

@Component({
  selector: 'app-view-inscription-page',
  imports: [ListInscription],
  templateUrl: './view-inscriptions-page.html',
  styleUrl: './view-inscriptions-page.css',
})
export class ViewInscriptionPage {
  private readonly _authService = inject(AuthData);
  private readonly _inscriptionService = inject(InscriptionService);
  private _user = signal<User | null>(null);

  constructor() {
    this._user.set(this._authService.user());
  }

  public user = computed(() => this._user());

  public inscriptionResource = rxResource({
    stream: () => this._inscriptionService.getInscriptionsPerUser(),
  });
}
