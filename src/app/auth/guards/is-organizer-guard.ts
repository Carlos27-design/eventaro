import { CanMatchFn } from '@angular/router';

export const isOrganizerGuard: CanMatchFn = (route, segments) => {
  return true;
};
