import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQrInscription } from './generate-qr-inscription';

describe('GenerateQrInscription', () => {
  let component: GenerateQrInscription;
  let fixture: ComponentFixture<GenerateQrInscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQrInscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQrInscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
