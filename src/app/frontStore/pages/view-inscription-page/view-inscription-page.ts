import { Component, inject, signal } from '@angular/core';
import { InscriptionService } from '../../../inscription/services/inscription-service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { GenerateQrInscription } from '../../../inscription/components/generate-qr-inscription/generate-qr-inscription';

@Component({
  selector: 'app-view-inscription-page',
  imports: [GenerateQrInscription],
  templateUrl: './view-inscription-page.html',
  styleUrl: './view-inscription-page.css',
})
export class ViewInscriptionPage {
  public inscriptionId = signal<string>('');
  private readonly _inscriptionService = inject(InscriptionService);
  private readonly _route = inject(ActivatedRoute);

  constructor() {
    this.inscriptionId.set(this._route.snapshot.params['id']);
  }

  public inscriptionResource = rxResource({
    params: () => ({ id: this.inscriptionId() }),
    stream: ({ params }) =>
      this._inscriptionService.getInscriptionById(params.id),
  });
}
