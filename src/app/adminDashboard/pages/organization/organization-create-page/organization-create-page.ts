import { Component } from '@angular/core';
import { CreateOrganizationForm } from '../../../../organization/components/create-organization-form/create-organization-form';

@Component({
  selector: 'app-organization-create-page',
  imports: [CreateOrganizationForm],
  templateUrl: './organization-create-page.html',
  styleUrl: './organization-create-page.css',
})
export class OrganizationCreatePage {}
