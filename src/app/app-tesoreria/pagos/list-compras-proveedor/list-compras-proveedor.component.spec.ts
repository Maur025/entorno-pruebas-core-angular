import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComprasProveedorComponent } from './list-compras-proveedor.component';

describe('ListComprasProveedorComponent', () => {
  let component: ListComprasProveedorComponent;
  let fixture: ComponentFixture<ListComprasProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComprasProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComprasProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
