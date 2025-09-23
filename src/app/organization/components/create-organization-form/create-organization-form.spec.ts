import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganizationForm } from './create-organization-form';

describe('CreateOrganizationForm', () => {
  let component: CreateOrganizationForm;
  let fixture: ComponentFixture<CreateOrganizationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrganizationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrganizationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
