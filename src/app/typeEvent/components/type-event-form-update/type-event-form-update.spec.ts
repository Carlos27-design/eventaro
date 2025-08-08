import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventFormUpdate } from './type-event-form-update';

describe('TypeEventFormUpdate', () => {
  let component: TypeEventFormUpdate;
  let fixture: ComponentFixture<TypeEventFormUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventFormUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventFormUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
