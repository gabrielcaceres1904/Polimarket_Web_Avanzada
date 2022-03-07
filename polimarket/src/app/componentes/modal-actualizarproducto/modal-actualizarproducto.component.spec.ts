import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarproductoComponent } from './modal-actualizarproducto.component';

describe('ModalActualizarproductoComponent', () => {
  let component: ModalActualizarproductoComponent;
  let fixture: ComponentFixture<ModalActualizarproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
