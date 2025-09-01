import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganizationForm } from './update-organization-form';

describe('UpdateOrganizationForm', () => {
  let component: UpdateOrganizationForm;
  let fixture: ComponentFixture<UpdateOrganizationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrganizationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrganizationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
