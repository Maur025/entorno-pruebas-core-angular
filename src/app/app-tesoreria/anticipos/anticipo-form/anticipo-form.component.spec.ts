import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticipoFormComponent } from './anticipo-form.component';

describe('AnticipoFormComponent', () => {
  let component: AnticipoFormComponent;
  let fixture: ComponentFixture<AnticipoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnticipoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnticipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
