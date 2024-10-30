import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosVariosFormComponent } from './pagos-varios-form.component';

describe('PagosVariosFormComponent', () => {
  let component: PagosVariosFormComponent;
  let fixture: ComponentFixture<PagosVariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosVariosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosVariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
