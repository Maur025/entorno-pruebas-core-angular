import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNewComponent } from './tabla-new.component';

describe('TablaNewComponent', () => {
  let component: TablaNewComponent;
  let fixture: ComponentFixture<TablaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
