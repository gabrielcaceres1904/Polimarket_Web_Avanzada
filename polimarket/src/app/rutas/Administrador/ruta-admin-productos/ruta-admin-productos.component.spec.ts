import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAdminProductosComponent } from './ruta-admin-productos.component';

describe('RutaAdminProductosComponent', () => {
  let component: RutaAdminProductosComponent;
  let fixture: ComponentFixture<RutaAdminProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAdminProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAdminProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
