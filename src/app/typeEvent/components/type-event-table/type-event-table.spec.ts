import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventTable } from './type-event-table';

describe('TypeEventTable', () => {
  let component: TypeEventTable;
  let fixture: ComponentFixture<TypeEventTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEventTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
