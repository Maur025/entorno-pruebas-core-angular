import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovimientoFondoOperativoComponent } from './list-movimiento-fondo-operativo.component';

describe('ListMovimientoFondoOperativoComponent', () => {
  let component: ListMovimientoFondoOperativoComponent;
  let fixture: ComponentFixture<ListMovimientoFondoOperativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovimientoFondoOperativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovimientoFondoOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
