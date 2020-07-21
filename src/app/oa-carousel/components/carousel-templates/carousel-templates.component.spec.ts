import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTemplatesComponent } from './carousel-templates.component';

describe('NavTemplatesComponent', () => {
  let component: CarouselTemplatesComponent;
  let fixture: ComponentFixture<CarouselTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
