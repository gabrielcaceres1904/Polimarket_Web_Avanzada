import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmareliminarproductoComponent } from './modal-confirmareliminarproducto.component';

describe('ModalConfirmareliminarproductoComponent', () => {
  let component: ModalConfirmareliminarproductoComponent;
  let fixture: ComponentFixture<ModalConfirmareliminarproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmareliminarproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmareliminarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
