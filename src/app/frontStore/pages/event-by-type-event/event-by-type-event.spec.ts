import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventByTypeEvent } from './event-by-type-event';

describe('EventByTypeEvent', () => {
  let component: EventByTypeEvent;
  let fixture: ComponentFixture<EventByTypeEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventByTypeEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventByTypeEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
