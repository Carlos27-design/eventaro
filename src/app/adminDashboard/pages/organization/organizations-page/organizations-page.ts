import { Component, inject } from '@angular/core';
import { OrganizationService } from '../../../../organization/services/organization-data';
import { rxResource } from '@angular/core/rxjs-interop';
import { Organization } from '../../../../organization/interfaces/organization';
import { OrganizationTable } from '../../../../organization/component/organization-table/organization-table';

@Component({
  selector: 'app-organizations-page',
  imports: [OrganizationTable],
  templateUrl: './organizations-page.html',
  styleUrl: './organizations-page.css',
})
export class OrganizationsPage {
  private readonly _organizationService = inject(OrganizationService);

  public organizationResource = rxResource<Organization[], unknown>({
    stream: () => this._organizationService.getOrganizations(),
  });

  reloadOrganizations() {
    this.organizationResource.reload();
  }
}
