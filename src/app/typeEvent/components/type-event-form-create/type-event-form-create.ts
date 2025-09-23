import { Component, computed, inject, signal } from '@angular/core';
import { TypeEventService } from '../../services/type-event-data';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeEvent } from '../../interfaces/type-event';
import { Create } from '../../../common/dialogs/create/create';

@Component({
  selector: 'app-type-event-form-create',
  imports: [Create, ReactiveFormsModule],
  templateUrl: './type-event-form-create.html',
  styleUrl: './type-event-form-create.css',
})
export class TypeEventFormCreate {
  public message = signal<string>('Tipo de Evento');
  private dialogOpen = signal(false);
  private readonly _typeEventService = inject(TypeEventService);
  private snackBarVisible = signal<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  public showDialog = computed(() => this.dialogOpen());

  public typeEventForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  public openDialog() {
    if (this.typeEventForm.valid) {
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
    const isValid = this.typeEventForm.valid;
    if (!isValid) return;

    const formValue = this.typeEventForm.value;

    const typeEventLike: Partial<TypeEvent> = formValue as any;

    this._typeEventService.createTypeEvent(typeEventLike).subscribe(() => {
      this.dialogOpen.set(false);
      this.showSnackBarNow();
      this._router.navigate(['/admin/type-events']);
    });
  }
}
