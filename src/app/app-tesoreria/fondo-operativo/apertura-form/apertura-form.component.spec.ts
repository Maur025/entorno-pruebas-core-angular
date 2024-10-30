import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaFormComponent } from './apertura-form.component';

describe('AperturaFormComponent', () => {
  let component: AperturaFormComponent;
  let fixture: ComponentFixture<AperturaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
