import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTemplatesComponent } from './nav-templates.component';

describe('NavTemplatesComponent', () => {
  let component: NavTemplatesComponent;
  let fixture: ComponentFixture<NavTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
