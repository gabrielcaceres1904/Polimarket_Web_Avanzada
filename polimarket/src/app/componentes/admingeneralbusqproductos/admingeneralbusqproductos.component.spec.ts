import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingeneralbusqproductosComponent } from './admingeneralbusqproductos.component';

describe('AdmingeneralbusqproductosComponent', () => {
  let component: AdmingeneralbusqproductosComponent;
  let fixture: ComponentFixture<AdmingeneralbusqproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingeneralbusqproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingeneralbusqproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
