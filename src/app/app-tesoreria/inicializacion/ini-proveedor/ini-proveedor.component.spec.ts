import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniProveedorComponent } from './ini-proveedor.component';

describe('IniProveedorComponent', () => {
  let component: IniProveedorComponent;
  let fixture: ComponentFixture<IniProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
