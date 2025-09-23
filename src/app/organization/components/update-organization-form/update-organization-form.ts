import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Organization } from '../../interfaces/organization';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrganizationService } from '../../services/organization-data';
import { Update } from '../../../common/dialogs/update/update';

@Component({
  selector: 'app-update-organization-form',
  imports: [ReactiveFormsModule, Update],
  templateUrl: './update-organization-form.html',
  styleUrl: './update-organization-form.css',
})
export class UpdateOrganizationForm {
  public message = signal<string>('organización');
  public organization = input<Organization>();
  private dialogOpen = signal<boolean>(false);
  private readonly _organizationService = inject(OrganizationService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private snackBarVisible = signal<boolean>(false);

  constructor() {
    effect(() => {
      const value = this.organization();
      if (value) this.formValues(value);
    });
  }

  public organizationForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  public showDialog = computed(() => this.dialogOpen());

  public showSnackBar = computed(() => this.snackBarVisible());

  public openDialog() {
    if (this.organizationForm.valid) {
      this.dialogOpen.set(true);
    }
  }

  public closeDialog() {
    this.dialogOpen.set(false);
  }

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
      .updateOrganization(this.organization()!.id, organizationLike)
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.showSnackBarNow();
        this._router.navigateByUrl('/admin/organizations');
      });
  }

  private formValues(value: Organization) {
    this.organizationForm.patchValue({
      name: value.name,
      description: value.description,
      email: value.email,
    });
  }
}
