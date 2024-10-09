import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationListComponent } from './compensation-list.component';

describe('CompensationListComponent', () => {
  let component: CompensationListComponent;
  let fixture: ComponentFixture<CompensationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompensationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
