import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrocuentaComponent } from './modal-registrocuenta.component';

describe('ModalRegistrocuentaComponent', () => {
  let component: ModalRegistrocuentaComponent;
  let fixture: ComponentFixture<ModalRegistrocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistrocuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
