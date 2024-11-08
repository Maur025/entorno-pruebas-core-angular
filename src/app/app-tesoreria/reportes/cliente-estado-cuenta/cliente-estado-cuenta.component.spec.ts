import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEstadoCuentaComponent } from './cliente-estado-cuenta.component';

describe('ClienteEstadoCuentaComponent', () => {
  let component: ClienteEstadoCuentaComponent;
  let fixture: ComponentFixture<ClienteEstadoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteEstadoCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
