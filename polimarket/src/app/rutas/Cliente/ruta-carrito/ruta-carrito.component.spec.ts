import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCarritoComponent } from './ruta-carrito.component';

describe('RutaCarritoComponent', () => {
  let component: RutaCarritoComponent;
  let fixture: ComponentFixture<RutaCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
