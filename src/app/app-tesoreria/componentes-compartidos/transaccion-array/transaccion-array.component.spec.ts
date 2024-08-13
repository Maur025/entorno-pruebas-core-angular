import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionArrayComponent } from './transaccion-array.component';

describe('TransaccionesArrayComponent', () => {
  let component: TransaccionArrayComponent;
  let fixture: ComponentFixture<TransaccionArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
