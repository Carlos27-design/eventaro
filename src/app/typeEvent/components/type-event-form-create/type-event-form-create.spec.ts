import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventFormCreate } from './type-event-form-create';

describe('TypeEventFormCreate', () => {
  let component: TypeEventFormCreate;
  let fixture: ComponentFixture<TypeEventFormCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventFormCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeEventFormCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
