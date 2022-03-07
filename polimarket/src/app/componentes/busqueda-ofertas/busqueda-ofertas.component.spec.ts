import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaOfertasComponent } from './busqueda-ofertas.component';

describe('BusquedaOfertasComponent', () => {
  let component: BusquedaOfertasComponent;
  let fixture: ComponentFixture<BusquedaOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaOfertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
