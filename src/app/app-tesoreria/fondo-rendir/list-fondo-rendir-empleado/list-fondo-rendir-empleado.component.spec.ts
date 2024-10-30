import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFondoRendirEmpleadoComponent } from './list-fondo-rendir-empleado.component';

describe('ListFondoRendirEmpleadoComponent', () => {
  let component: ListFondoRendirEmpleadoComponent;
  let fixture: ComponentFixture<ListFondoRendirEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFondoRendirEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFondoRendirEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
