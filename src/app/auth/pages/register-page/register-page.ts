import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthData } from '../../services/auth-data';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private readonly _authService = inject(AuthData);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly snackBarVisible = signal<boolean>(false);

  public registerForm = this._formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  public showSnackBar = computed(() => this.snackBarVisible());

  private showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }
  public onSubmit() {
    const { fullName, email, password, confirmPassword } =
      this.registerForm.value;

    if (password === confirmPassword) {
      this._authService
        .register(fullName!, email!, password!)
        .subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.registerForm.reset();
            this.showSnackBarNow();
            this._router.navigateByUrl('/auth/login');
            return;
          }
        });
    }
  }
}
