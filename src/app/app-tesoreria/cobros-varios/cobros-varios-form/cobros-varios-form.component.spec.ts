import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosVariosFormComponent } from './cobros-varios-form.component';

describe('CobrosVariosFormComponent', () => {
  let component: CobrosVariosFormComponent;
  let fixture: ComponentFixture<CobrosVariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobrosVariosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrosVariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
