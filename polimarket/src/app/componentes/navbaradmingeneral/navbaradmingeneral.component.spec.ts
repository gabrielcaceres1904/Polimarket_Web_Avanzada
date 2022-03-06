import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaradmingeneralComponent } from './navbaradmingeneral.component';

describe('NavbaradmingeneralComponent', () => {
  let component: NavbaradmingeneralComponent;
  let fixture: ComponentFixture<NavbaradmingeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbaradmingeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaradmingeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
