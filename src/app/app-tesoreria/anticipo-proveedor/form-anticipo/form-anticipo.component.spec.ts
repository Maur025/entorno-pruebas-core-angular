import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnticipoComponent } from './form-anticipo.component';

describe('FormAnticipoComponent', () => {
  let component: FormAnticipoComponent;
  let fixture: ComponentFixture<FormAnticipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnticipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
