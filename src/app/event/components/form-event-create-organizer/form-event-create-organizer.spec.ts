import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventCreateOrganizer } from './form-event-create-organizer';

describe('FormEventCreateOrganizer', () => {
  let component: FormEventCreateOrganizer;
  let fixture: ComponentFixture<FormEventCreateOrganizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEventCreateOrganizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEventCreateOrganizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
