import { Component, computed, inject, signal } from '@angular/core';
import { AuthData } from '../../services/auth-data';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Create } from '../../../common/dialogs/create/create';

@Component({
  selector: 'app-user-form-create',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Create],
  templateUrl: './user-form-create.html',
  styleUrl: './user-form-create.css',
})
export class UserFormCreate {
  public message = signal<string>('Usuario');
  private dialogOpen = signal<boolean>(false);
  private readonly _authService = inject(AuthData);
  private snackBarVisible = signal<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  public showDialog = computed(() => this.dialogOpen());

  public userForm = this._formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
  });

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

    const fullName = formValue.fullName;
    const email = formValue.email;
    const password = formValue.password;
    const confirmPassword = formValue.confirmPassword;
    const role = formValue.role;

    if (password === confirmPassword) {
      this._authService
        .createUserAdmin(fullName!, email!, password!, role!)
        .subscribe(() => {
          this.dialogOpen.set(false);
          this.showSnackBarNow();
          this._router.navigate(['/admin/users']);
        });
    }
  }
}
