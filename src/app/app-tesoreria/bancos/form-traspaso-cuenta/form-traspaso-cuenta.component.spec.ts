import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTraspasoCuentaComponent } from './form-traspaso-cuenta.component';

describe('FormTraspasoCuentaComponent', () => {
  let component: FormTraspasoCuentaComponent;
  let fixture: ComponentFixture<FormTraspasoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTraspasoCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTraspasoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
