import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscription } from './list-inscription';

describe('ListInscription', () => {
  let component: ListInscription;
  let fixture: ComponentFixture<ListInscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
