import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindownPopupComponent } from './windown-popup.component';

describe('WindownPopupComponent', () => {
  let component: WindownPopupComponent;
  let fixture: ComponentFixture<WindownPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindownPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindownPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
