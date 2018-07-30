import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightFixedComponent } from './sidebar-right-fixed.component';

describe('SidebarRightFixedComponent', () => {
  let component: SidebarRightFixedComponent;
  let fixture: ComponentFixture<SidebarRightFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRightFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
