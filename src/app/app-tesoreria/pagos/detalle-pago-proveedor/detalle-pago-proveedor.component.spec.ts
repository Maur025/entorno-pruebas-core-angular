import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagoProveedorComponent } from './detalle-pago-proveedor.component';

describe('DetallePagoProveedorComponent', () => {
  let component: DetallePagoProveedorComponent;
  let fixture: ComponentFixture<DetallePagoProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePagoProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePagoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
