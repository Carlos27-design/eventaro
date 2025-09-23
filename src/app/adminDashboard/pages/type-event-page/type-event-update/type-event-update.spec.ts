import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventUpdate } from './type-event-update';

describe('TypeEventUpdate', () => {
  let component: TypeEventUpdate;
  let fixture: ComponentFixture<TypeEventUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
