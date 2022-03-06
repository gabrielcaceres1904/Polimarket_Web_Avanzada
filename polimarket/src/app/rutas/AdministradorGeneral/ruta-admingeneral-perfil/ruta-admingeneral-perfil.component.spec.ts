import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAdmingeneralPerfilComponent } from './ruta-admingeneral-perfil.component';

describe('RutaAdmingeneralPerfilComponent', () => {
  let component: RutaAdmingeneralPerfilComponent;
  let fixture: ComponentFixture<RutaAdmingeneralPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAdmingeneralPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAdmingeneralPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
