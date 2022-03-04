import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaResumenComponent } from './ruta-resumen.component';

describe('RutaResumenComponent', () => {
  let component: RutaResumenComponent;
  let fixture: ComponentFixture<RutaResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
