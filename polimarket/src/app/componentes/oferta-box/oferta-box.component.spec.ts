import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaBoxComponent } from './oferta-box.component';

describe('OfertaBoxComponent', () => {
  let component: OfertaBoxComponent;
  let fixture: ComponentFixture<OfertaBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
