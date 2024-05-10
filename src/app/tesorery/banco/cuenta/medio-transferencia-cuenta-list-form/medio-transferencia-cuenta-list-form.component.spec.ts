import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioTransferenciaCuentaListFormComponent } from './medio-transferencia-cuenta-list-form.component';

describe('MedioTransferenciaCuentaListFormComponent', () => {
  let component: MedioTransferenciaCuentaListFormComponent;
  let fixture: ComponentFixture<MedioTransferenciaCuentaListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedioTransferenciaCuentaListFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioTransferenciaCuentaListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
