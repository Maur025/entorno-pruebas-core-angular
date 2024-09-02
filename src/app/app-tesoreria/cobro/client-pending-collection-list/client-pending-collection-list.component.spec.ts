import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPendingCollectionListComponent } from './client-pending-collection-list.component';

describe('ClientPendingCollectionListComponent', () => {
  let component: ClientPendingCollectionListComponent;
  let fixture: ComponentFixture<ClientPendingCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPendingCollectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPendingCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
