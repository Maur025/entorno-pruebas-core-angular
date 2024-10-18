import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicializacionComponent } from './inicializacion.component';

describe('InicializacionComponent', () => {
  let component: InicializacionComponent;
  let fixture: ComponentFixture<InicializacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicializacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicializacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
