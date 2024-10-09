import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationFormComponent } from './compensation-form.component';

describe('CompensationFormComponent', () => {
  let component: CompensationFormComponent;
  let fixture: ComponentFixture<CompensationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompensationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
