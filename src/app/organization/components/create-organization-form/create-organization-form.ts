import { Component, computed, inject, signal } from '@angular/core';
import { OrganizationService } from '../../services/organization-data';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Organization } from '../../interfaces/organization';
import { Create } from '../../../common/dialogs/create/create';

@Component({
  selector: 'app-create-organization-form',
  imports: [Create, ReactiveFormsModule],
  templateUrl: './create-organization-form.html',
  styleUrl: './create-organization-form.css',
})
export class CreateOrganizationForm {
  public message = signal<string>('Organización');
  private dialogOpen = signal(false);

  private readonly _organizationService = inject(OrganizationService);
  private readonly snackBarVisible = signal<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  public showDialog = computed(() => this.dialogOpen());

  public organizationForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  public openDialog() {
    if (this.organizationForm.valid) {
      this.dialogOpen.set(true);
    }
  }

  public closeDialog() {
    this.dialogOpen.set(false);
  }

  public showSnackBar = computed(() => this.snackBarVisible());

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }

  public onSubmit() {
    const isValid = this.organizationForm.valid;
    if (!isValid) return;

    const formValue = this.organizationForm.value;

    const organizationLike: Partial<Organization> = formValue as any;

    this._organizationService
      .createOrganization(organizationLike)
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.showSnackBarNow();
        this._router.navigateByUrl('/admin/organizations');
      });
  }
}
