import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUpdatePage } from './organization-update-page';

describe('OrganizationUpdatePage', () => {
  let component: OrganizationUpdatePage;
  let fixture: ComponentFixture<OrganizationUpdatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUpdatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
