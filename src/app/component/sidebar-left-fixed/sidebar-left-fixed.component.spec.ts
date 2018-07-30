import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftFixedComponent } from './sidebar-left-fixed.component';

describe('SidebarLeftFixedComponent', () => {
  let component: SidebarLeftFixedComponent;
  let fixture: ComponentFixture<SidebarLeftFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarLeftFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
