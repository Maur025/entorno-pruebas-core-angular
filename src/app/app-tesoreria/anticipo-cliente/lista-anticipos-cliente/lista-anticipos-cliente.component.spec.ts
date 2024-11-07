import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnticiposClienteComponent } from './lista-anticipos-cliente.component';

describe('ListaAnticiposClienteComponent', () => {
  let component: ListaAnticiposClienteComponent;
  let fixture: ComponentFixture<ListaAnticiposClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnticiposClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnticiposClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
