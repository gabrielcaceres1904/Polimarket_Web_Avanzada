import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaradmingeneralComponent } from './sidebaradmingeneral.component';

describe('SidebaradmingeneralComponent', () => {
  let component: SidebaradmingeneralComponent;
  let fixture: ComponentFixture<SidebaradmingeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebaradmingeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebaradmingeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
