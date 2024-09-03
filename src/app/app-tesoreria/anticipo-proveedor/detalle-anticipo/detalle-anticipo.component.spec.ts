import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAnticipoComponent } from './detalle-anticipo.component';

describe('DetalleAnticipoComponent', () => {
  let component: DetalleAnticipoComponent;
  let fixture: ComponentFixture<DetalleAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAnticipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
