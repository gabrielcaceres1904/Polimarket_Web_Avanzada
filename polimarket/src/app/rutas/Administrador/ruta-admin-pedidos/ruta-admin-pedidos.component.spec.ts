import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAdminPedidosComponent } from './ruta-admin-pedidos.component';

describe('RutaAdminPedidosComponent', () => {
  let component: RutaAdminPedidosComponent;
  let fixture: ComponentFixture<RutaAdminPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAdminPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAdminPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
