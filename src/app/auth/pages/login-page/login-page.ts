import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthData } from '../../services/auth-data';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly _authService = inject(AuthData);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  public loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onSubmit() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this._authService.login(email, password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loginForm.reset();
        this._router.navigateByUrl('/');
        return;
      }
    });
  }
}
