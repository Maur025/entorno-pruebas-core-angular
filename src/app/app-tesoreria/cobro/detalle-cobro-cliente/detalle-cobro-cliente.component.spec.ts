import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCobroClienteComponent } from './detalle-cobro-cliente.component';

describe('DetalleCobroClienteComponent', () => {
  let component: DetalleCobroClienteComponent;
  let fixture: ComponentFixture<DetalleCobroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCobroClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCobroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
