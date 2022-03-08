import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeBoxComponent } from './admin-home-box.component';

describe('AdminHomeBoxComponent', () => {
  let component: AdminHomeBoxComponent;
  let fixture: ComponentFixture<AdminHomeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
