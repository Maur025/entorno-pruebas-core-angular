import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaCierreComponent } from './apertura-cierre.component';

describe('AperturaCierreComponent', () => {
  let component: AperturaCierreComponent;
  let fixture: ComponentFixture<AperturaCierreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturaCierreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
