import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaSucursalProductosComponent } from './busqueda-sucursal-productos.component';

describe('BusquedaSucursalProductosComponent', () => {
  let component: BusquedaSucursalProductosComponent;
  let fixture: ComponentFixture<BusquedaSucursalProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaSucursalProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaSucursalProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
