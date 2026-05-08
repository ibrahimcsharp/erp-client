import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubmissionCreatePopupComponent } from './task-submission-create-popup.component';

describe('TaskSubmissionCreatePopupComponent', () => {
  let component: TaskSubmissionCreatePopupComponent;
  let fixture: ComponentFixture<TaskSubmissionCreatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSubmissionCreatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSubmissionCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
