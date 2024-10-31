import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniFondoRendirComponent } from './ini-fondo-rendir.component';

describe('IniFondoRendirComponent', () => {
  let component: IniFondoRendirComponent;
  let fixture: ComponentFixture<IniFondoRendirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniFondoRendirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniFondoRendirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
