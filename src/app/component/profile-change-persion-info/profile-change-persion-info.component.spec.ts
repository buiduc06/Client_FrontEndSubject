import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangePersionInfoComponent } from './profile-change-persion-info.component';

describe('ProfileChangePersionInfoComponent', () => {
  let component: ProfileChangePersionInfoComponent;
  let fixture: ComponentFixture<ProfileChangePersionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangePersionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangePersionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
