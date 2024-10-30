import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsBeneficiaryDetailComponentList } from './pending-payments-beneficiary-detail.component-list';

describe('PendingPaymentsBeneficiaryDetailComponent', () => {
  let component: PendingPaymentsBeneficiaryDetailComponentList;
  let fixture: ComponentFixture<PendingPaymentsBeneficiaryDetailComponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentsBeneficiaryDetailComponentList ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPaymentsBeneficiaryDetailComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
