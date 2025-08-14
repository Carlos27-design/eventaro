import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTable } from './organization-table';

describe('OrganizationTable', () => {
  let component: OrganizationTable;
  let fixture: ComponentFixture<OrganizationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
