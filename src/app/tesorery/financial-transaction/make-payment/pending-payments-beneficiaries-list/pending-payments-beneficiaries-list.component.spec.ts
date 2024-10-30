import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsBeneficiariesListComponent } from './pending-payments-beneficiaries-list.component';

describe('PendingPaymentsBeneficiariesListComponent', () => {
  let component: PendingPaymentsBeneficiariesListComponent;
  let fixture: ComponentFixture<PendingPaymentsBeneficiariesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentsBeneficiariesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPaymentsBeneficiariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
