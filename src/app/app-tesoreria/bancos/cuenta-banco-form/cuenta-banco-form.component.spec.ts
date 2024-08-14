import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancoFormComponent } from './cuenta-banco-form.component';

describe('CuentaBancoFormComponent', () => {
  let component: CuentaBancoFormComponent;
  let fixture: ComponentFixture<CuentaBancoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBancoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBancoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
