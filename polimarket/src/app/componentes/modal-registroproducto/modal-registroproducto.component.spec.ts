import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroproductoComponent } from './modal-registroproducto.component';

describe('ModalRegistroproductoComponent', () => {
  let component: ModalRegistroproductoComponent;
  let fixture: ComponentFixture<ModalRegistroproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
