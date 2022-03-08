import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPerfiladmingeneralComponent } from './ruta-perfiladmingeneral.component';

describe('RutaPerfiladmingeneralComponent', () => {
  let component: RutaPerfiladmingeneralComponent;
  let fixture: ComponentFixture<RutaPerfiladmingeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaPerfiladmingeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPerfiladmingeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
