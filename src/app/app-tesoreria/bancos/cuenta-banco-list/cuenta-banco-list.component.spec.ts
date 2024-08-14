import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancoListComponent } from './cuenta-banco-list.component';

describe('CuentaBancoListComponent', () => {
  let component: CuentaBancoListComponent;
  let fixture: ComponentFixture<CuentaBancoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBancoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBancoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
