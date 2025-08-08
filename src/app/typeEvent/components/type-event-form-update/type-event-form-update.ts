import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { TypeEvent } from '../../interfaces/type-event';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeEventService } from '../../services/type-event-data';
import { Router } from '@angular/router';
import { Update } from '../../../common/dialogs/update/update';

@Component({
  selector: 'app-type-event-form-update',
  imports: [Update, ReactiveFormsModule],
  templateUrl: './type-event-form-update.html',
  styleUrl: './type-event-form-update.css',
})
export class TypeEventFormUpdate {
  public message = signal<string>('Tipo de Evento');
  private dialogOpen = signal(false);
  private readonly _typeEventService = inject(TypeEventService);
  private snackBarVisible = signal<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  public typeEvent = input<TypeEvent>();

  public showDialog = computed(() => this.dialogOpen());

  public typeEventForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    effect(() => {
      const value = this.typeEvent();
      if (value) this.setFormValues(value);
    });
  }

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

    this._typeEventService
      .updateTypeEvent(this.typeEvent()!.id, typeEventLike)
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.showSnackBarNow();
        this._router.navigate(['/admin/type-events']);
      });
  }

  private setFormValues(typeEvent: TypeEvent) {
    this.typeEventForm.setValue({
      name: typeEvent.name,
    });
  }
}
