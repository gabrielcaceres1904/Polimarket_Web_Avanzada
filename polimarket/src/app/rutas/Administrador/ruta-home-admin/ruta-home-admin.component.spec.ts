import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHomeAdminComponent } from './ruta-home-admin.component';

describe('RutaHomeAdminComponent', () => {
  let component: RutaHomeAdminComponent;
  let fixture: ComponentFixture<RutaHomeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaHomeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
