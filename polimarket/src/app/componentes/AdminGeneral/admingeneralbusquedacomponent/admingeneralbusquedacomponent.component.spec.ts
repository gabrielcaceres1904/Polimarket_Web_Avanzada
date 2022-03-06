import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingeneralbusquedacomponentComponent } from './admingeneralbusquedacomponent.component';

describe('AdmingeneralbusquedacomponentComponent', () => {
  let component: AdmingeneralbusquedacomponentComponent;
  let fixture: ComponentFixture<AdmingeneralbusquedacomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingeneralbusquedacomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingeneralbusquedacomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
