import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxActivityFeedComponent } from './box-activity-feed.component';

describe('BoxActivityFeedComponent', () => {
  let component: BoxActivityFeedComponent;
  let fixture: ComponentFixture<BoxActivityFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxActivityFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxActivityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
