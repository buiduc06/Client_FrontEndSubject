import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBpComponent } from './header-bp.component';

describe('HeaderBpComponent', () => {
  let component: HeaderBpComponent;
  let fixture: ComponentFixture<HeaderBpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
