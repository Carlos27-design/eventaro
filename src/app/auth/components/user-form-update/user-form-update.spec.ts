import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormUpdate } from './user-form-update';

describe('UserFormUpdate', () => {
  let component: UserFormUpdate;
  let fixture: ComponentFixture<UserFormUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
