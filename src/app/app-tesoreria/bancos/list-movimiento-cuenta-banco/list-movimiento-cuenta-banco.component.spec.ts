import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovimientoCuentaBancoComponent } from './list-movimiento-cuenta-banco.component';

describe('ListMovimientoCuentaBancoComponent', () => {
  let component: ListMovimientoCuentaBancoComponent;
  let fixture: ComponentFixture<ListMovimientoCuentaBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovimientoCuentaBancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovimientoCuentaBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
