import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxWeatherComponent } from './box-weather.component';

describe('BoxWeatherComponent', () => {
  let component: BoxWeatherComponent;
  let fixture: ComponentFixture<BoxWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
