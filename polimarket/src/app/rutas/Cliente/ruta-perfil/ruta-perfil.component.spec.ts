import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPerfilComponent } from './ruta-perfil.component';

describe('RutaPerfilComponent', () => {
  let component: RutaPerfilComponent;
  let fixture: ComponentFixture<RutaPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
