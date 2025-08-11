import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthData } from '../services/auth-data';
import { firstValueFrom } from 'rxjs';

export const isUserGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthData);
  const router = inject(Router);

  await firstValueFrom(authService.checkStatus());

  const isOrganizer = authService.isOrganizer();

  if (!isOrganizer) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
