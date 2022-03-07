import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarcuentaComponent } from './modal-eliminarcuenta.component';

describe('ModalEliminarcuentaComponent', () => {
  let component: ModalEliminarcuentaComponent;
  let fixture: ComponentFixture<ModalEliminarcuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarcuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
