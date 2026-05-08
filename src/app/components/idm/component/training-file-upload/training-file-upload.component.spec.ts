import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFileUploadComponent } from './training-file-upload.component';

describe('TrainingFileUploadComponent', () => {
  let component: TrainingFileUploadComponent;
  let fixture: ComponentFixture<TrainingFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
