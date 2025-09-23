import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInscriptionPage } from './view-inscription-page';

describe('ViewInscriptionPage', () => {
  let component: ViewInscriptionPage;
  let fixture: ComponentFixture<ViewInscriptionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInscriptionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
