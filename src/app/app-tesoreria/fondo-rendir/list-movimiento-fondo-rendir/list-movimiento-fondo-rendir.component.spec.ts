import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovimientoFondoRendirComponent } from './list-movimiento-fondo-rendir.component';

describe('ListMovimientoFondoRendirComponent', () => {
  let component: ListMovimientoFondoRendirComponent;
  let fixture: ComponentFixture<ListMovimientoFondoRendirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovimientoFondoRendirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovimientoFondoRendirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
