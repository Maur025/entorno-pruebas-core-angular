import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePendingCollectionListComponent } from './sale-pending-collection-list.component';

describe('SalePendingCollectionListComponent', () => {
  let component: SalePendingCollectionListComponent;
  let fixture: ComponentFixture<SalePendingCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePendingCollectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalePendingCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
