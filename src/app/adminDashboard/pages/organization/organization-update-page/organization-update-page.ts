import { Component, inject, signal } from '@angular/core';
import { UpdateOrganizationForm } from '../../../../organization/components/update-organization-form/update-organization-form';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { OrganizationService } from '../../../../organization/services/organization-data';

@Component({
  selector: 'app-organization-update-page',
  imports: [UpdateOrganizationForm],
  templateUrl: './organization-update-page.html',
  styleUrl: './organization-update-page.css',
})
export class OrganizationUpdatePage {
  private organizationId = signal<string>('');

  private readonly _route = inject(ActivatedRoute);
  private readonly _organizationService = inject(OrganizationService);
  constructor() {
    this.organizationId.set(this._route.snapshot.params['id']);
  }

  public organizationResource = rxResource({
    params: () => ({ id: this.organizationId() }),
    stream: ({ params }) =>
      this._organizationService.getOrganizationById(params.id),
  });
}
