import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubmissionListComponent } from './task-submission-list.component';

describe('TaskSubmissionListComponent', () => {
  let component: TaskSubmissionListComponent;
  let fixture: ComponentFixture<TaskSubmissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSubmissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
