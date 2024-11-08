import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorEstadoCuentaComponent } from './proveedor-estado-cuenta.component';

describe('ProveedorEstadoCuentaComponent', () => {
  let component: ProveedorEstadoCuentaComponent;
  let fixture: ComponentFixture<ProveedorEstadoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorEstadoCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
