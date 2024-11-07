import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CollectionFormComponent } from './collection-form.component';

describe('CollectionFormComponent', () => {
  let component: CollectionFormComponent;
  let fixture: ComponentFixture<CollectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionFormComponent ],
      imports: [ToastrModule.forRoot(), HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
