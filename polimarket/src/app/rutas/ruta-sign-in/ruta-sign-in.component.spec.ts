import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaSignInComponent } from './ruta-sign-in.component';

describe('RutaSignInComponent', () => {
  let component: RutaSignInComponent;
  let fixture: ComponentFixture<RutaSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
