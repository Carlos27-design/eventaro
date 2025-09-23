import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthData } from '../services/auth-data';
import { first, firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthData);

  const router = inject(Router);

  await firstValueFrom(authService.checkStatus());

  const isAdmin = authService.isAdmin();

  if (!isAdmin) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
