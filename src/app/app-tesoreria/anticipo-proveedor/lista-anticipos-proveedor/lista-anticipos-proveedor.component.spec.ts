import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnticiposProveedorComponent } from './lista-anticipos-proveedor.component';

describe('ListaAnticiposProveedorComponent', () => {
  let component: ListaAnticiposProveedorComponent;
  let fixture: ComponentFixture<ListaAnticiposProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnticiposProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnticiposProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
