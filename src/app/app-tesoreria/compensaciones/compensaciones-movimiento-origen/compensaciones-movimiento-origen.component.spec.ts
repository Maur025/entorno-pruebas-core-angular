import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesMovimientoOrigenComponent } from './compensaciones-movimiento-origen.component';

describe('CompensacionesMovimientoOrigenComponent', () => {
  let component: CompensacionesMovimientoOrigenComponent;
  let fixture: ComponentFixture<CompensacionesMovimientoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensacionesMovimientoOrigenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompensacionesMovimientoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
