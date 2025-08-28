import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCreate } from './user-form-create';

describe('UserForm', () => {
  let component: UserFormCreate;
  let fixture: ComponentFixture<UserFormCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
