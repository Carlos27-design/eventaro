import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventCreate } from './form-event-create';

describe('FormEventCreate', () => {
  let component: FormEventCreate;
  let fixture: ComponentFixture<FormEventCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEventCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEventCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
