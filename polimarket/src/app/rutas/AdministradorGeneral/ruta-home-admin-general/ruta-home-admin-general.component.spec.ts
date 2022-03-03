import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeAdminGeneralComponent } from './ruta-home-admin-general.component';

describe('RutaHomeAdminGeneralComponent', () => {
  let component: RutaHomeAdminGeneralComponent;
  let fixture: ComponentFixture<RutaHomeAdminGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaHomeAdminGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeAdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
