import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventCreate } from './type-event-create';

describe('TypeEventCreate', () => {
  let component: TypeEventCreate;
  let fixture: ComponentFixture<TypeEventCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
