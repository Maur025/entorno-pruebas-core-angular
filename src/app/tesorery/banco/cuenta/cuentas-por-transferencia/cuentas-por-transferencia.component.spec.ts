import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasPorTransferenciaComponent } from './cuentas-por-transferencia.component';

describe('CuentasPorTransferenciaComponent', () => {
  let component: CuentasPorTransferenciaComponent;
  let fixture: ComponentFixture<CuentasPorTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasPorTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasPorTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
