import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNewCuentaComponent } from './formulario-new-cuenta.component';

describe('FormularioNewCuentaComponent', () => {
  let component: FormularioNewCuentaComponent;
  let fixture: ComponentFixture<FormularioNewCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioNewCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioNewCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
