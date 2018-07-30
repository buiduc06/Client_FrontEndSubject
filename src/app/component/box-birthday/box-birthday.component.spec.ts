import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxBirthdayComponent } from './box-birthday.component';

describe('BoxBirthdayComponent', () => {
  let component: BoxBirthdayComponent;
  let fixture: ComponentFixture<BoxBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
