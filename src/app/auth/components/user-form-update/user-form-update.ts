import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthData } from '../../services/auth-data';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Update } from '../../../common/dialogs/update/update';

@Component({
  selector: 'app-user-form-update',
  imports: [ReactiveFormsModule, Update],
  templateUrl: './user-form-update.html',
  styleUrl: './user-form-update.css',
})
export class UserFormUpdate {
  public message = signal<string>('El Usuario');
  public user = input<User>();
  private dialogOpen = signal<boolean>(false);
  private readonly _authData = inject(AuthData);
  private snackBarVisible = signal<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  public showDialog = computed(() => this.dialogOpen());

  public userForm = this._formBuilder.group({
    fullName: ['', [Validators.minLength(3)]],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(6)]],
    role: [''],
  });

  constructor() {
    effect(() => {
      const value = this.user();
      if (value) this.setFormValue(value);
    });
  }

  public openDialog() {
    if (this.userForm.valid) {
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
    const isValid = this.userForm.valid;
    if (!isValid) return;

    const formValue = this.userForm.value;

    const password = formValue.password?.trim()
      ? formValue.password
      : undefined;

    this._authData
      .updateUserAdmin(
        this.user()!.id,
        formValue.fullName!,
        formValue.email!,
        formValue.role!,
        password!
      )
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.showSnackBarNow();
        this._router.navigate(['/admin/users']);
      });
  }

  private setFormValue(user: User) {
    this.userForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.roles,
    });
  }
}
