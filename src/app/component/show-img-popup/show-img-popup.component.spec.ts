import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImgPopupComponent } from './show-img-popup.component';

describe('ShowImgPopupComponent', () => {
  let component: ShowImgPopupComponent;
  let fixture: ComponentFixture<ShowImgPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImgPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
