import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesArrayComponent } from './transacciones-array.component';

describe('TransaccionesArrayComponent', () => {
  let component: TransaccionesArrayComponent;
  let fixture: ComponentFixture<TransaccionesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionesArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
