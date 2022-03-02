import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeclienteComponent } from './ruta-homecliente.component';

describe('RutaHomeclienteComponent', () => {
  let component: RutaHomeclienteComponent;
  let fixture: ComponentFixture<RutaHomeclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaHomeclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
