import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesembolsoFormComponent } from './desembolso-form.component';

describe('DesembolsoFormComponent', () => {
  let component: DesembolsoFormComponent;
  let fixture: ComponentFixture<DesembolsoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesembolsoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesembolsoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
