import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnticipoComponent } from './list-anticipo.component';

describe('ListAnticipoComponent', () => {
  let component: ListAnticipoComponent;
  let fixture: ComponentFixture<ListAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnticipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
