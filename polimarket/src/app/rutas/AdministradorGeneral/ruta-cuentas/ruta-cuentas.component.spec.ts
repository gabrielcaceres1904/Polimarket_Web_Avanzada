import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCuentasComponent } from './ruta-cuentas.component';

describe('RutaCuentasComponent', () => {
  let component: RutaCuentasComponent;
  let fixture: ComponentFixture<RutaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
