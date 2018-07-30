import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFriendSuggestionsComponent } from './box-friend-suggestions.component';

describe('BoxFriendSuggestionsComponent', () => {
  let component: BoxFriendSuggestionsComponent;
  let fixture: ComponentFixture<BoxFriendSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFriendSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFriendSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
