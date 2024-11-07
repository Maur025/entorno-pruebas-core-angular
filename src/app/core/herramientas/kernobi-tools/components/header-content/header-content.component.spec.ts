import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContentComponent } from './header-content.component';

describe('HeaderContentComponent', () => {
  let component: HeaderContentComponent;
  let fixture: ComponentFixture<HeaderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debe emitir el evento "nuevo" cuando se llame', () => {
    spyOn(component.nuevo, 'emit');
    component.nuevo.emit();
    expect(component.nuevo.emit).toHaveBeenCalled();
  });

  it('debe emitir el evento "refrescar" cuando se llame', () => {
    spyOn(component.refrescar, 'emit');
    component.refrescar.emit();
    expect(component.refrescar.emit).toHaveBeenCalled();
  });

});
