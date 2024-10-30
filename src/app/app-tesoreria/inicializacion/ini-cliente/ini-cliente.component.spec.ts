import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniClienteComponent } from './ini-cliente.component';

describe('IniClienteComponent', () => {
  let component: IniClienteComponent;
  let fixture: ComponentFixture<IniClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
