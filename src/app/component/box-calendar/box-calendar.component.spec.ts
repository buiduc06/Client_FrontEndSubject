import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCalendarComponent } from './box-calendar.component';

describe('BoxCalendarComponent', () => {
  let component: BoxCalendarComponent;
  let fixture: ComponentFixture<BoxCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
