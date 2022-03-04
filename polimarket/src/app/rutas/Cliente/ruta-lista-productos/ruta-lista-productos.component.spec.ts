import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaListaProductosComponent } from './ruta-lista-productos.component';

describe('RutaListaProductosComponent', () => {
  let component: RutaListaProductosComponent;
  let fixture: ComponentFixture<RutaListaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaListaProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaListaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
