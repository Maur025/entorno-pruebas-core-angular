import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionCajaComponent } from './accion-caja.component';

describe('AccionCajaComponent', () => {
  let component: AccionCajaComponent;
  let fixture: ComponentFixture<AccionCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
