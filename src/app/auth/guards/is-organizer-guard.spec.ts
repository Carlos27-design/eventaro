import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { isOrganizerGuard } from './is-organizer-guard';

describe('isOrganizerGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isOrganizerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
