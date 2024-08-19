import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnticiposComponent } from './list-anticipos.component';

describe('ListAnticiposComponent', () => {
  let component: ListAnticiposComponent;
  let fixture: ComponentFixture<ListAnticiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnticiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnticiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
