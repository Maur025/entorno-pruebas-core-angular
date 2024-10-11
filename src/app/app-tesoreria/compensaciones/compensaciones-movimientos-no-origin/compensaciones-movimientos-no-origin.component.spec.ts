import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesMovimientosNoOriginComponent } from './compensaciones-movimientos-no-origin.component';

describe('CompensacionesMovimientosNoOriginComponent', () => {
  let component: CompensacionesMovimientosNoOriginComponent;
  let fixture: ComponentFixture<CompensacionesMovimientosNoOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensacionesMovimientosNoOriginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompensacionesMovimientosNoOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
