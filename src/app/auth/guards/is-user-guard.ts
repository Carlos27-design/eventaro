import { CanMatchFn } from '@angular/router';

export const isUserGuard: CanMatchFn = (route, segments) => {
  return true;
};
