import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDashboardComponent } from './ruta-dashboard.component';

describe('RutaDashboardComponent', () => {
  let component: RutaDashboardComponent;
  let fixture: ComponentFixture<RutaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
