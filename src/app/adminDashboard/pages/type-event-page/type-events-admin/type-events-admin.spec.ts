import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventsAdmin } from './type-events-admin';

describe('TypeEventsAdmin', () => {
  let component: TypeEventsAdmin;
  let fixture: ComponentFixture<TypeEventsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
