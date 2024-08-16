import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoCajaListComponent } from './movimiento-caja-list.component';

describe('MovimientoCajaListComponent', () => {
  let component: MovimientoCajaListComponent;
  let fixture: ComponentFixture<MovimientoCajaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoCajaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoCajaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
