import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCollectionsDebtorsListComponent } from './pending-collections-debtors-list.component';

describe('PendingCollectionsDebtorsListComponent', () => {
  let component: PendingCollectionsDebtorsListComponent;
  let fixture: ComponentFixture<PendingCollectionsDebtorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCollectionsDebtorsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCollectionsDebtorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
