import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAdminPerfilComponent } from './ruta-admin-perfil.component';

describe('RutaAdminPerfilComponent', () => {
  let component: RutaAdminPerfilComponent;
  let fixture: ComponentFixture<RutaAdminPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAdminPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAdminPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
