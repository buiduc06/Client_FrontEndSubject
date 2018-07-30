import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindownPopupChatComponent } from './windown-popup-chat.component';

describe('WindownPopupChatComponent', () => {
  let component: WindownPopupChatComponent;
  let fixture: ComponentFixture<WindownPopupChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindownPopupChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindownPopupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
