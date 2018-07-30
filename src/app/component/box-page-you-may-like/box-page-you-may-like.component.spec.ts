import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPageYouMayLikeComponent } from './box-page-you-may-like.component';

describe('BoxPageYouMayLikeComponent', () => {
  let component: BoxPageYouMayLikeComponent;
  let fixture: ComponentFixture<BoxPageYouMayLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxPageYouMayLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxPageYouMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
