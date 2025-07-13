import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEvents } from './form-update-events';

describe('FormUpdateEvents', () => {
  let component: FormUpdateEvents;
  let fixture: ComponentFixture<FormUpdateEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
