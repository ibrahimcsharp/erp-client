import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubmissionCreateComponent } from './task-submission-create.component';

describe('TaskSubmissionCreateComponent', () => {
  let component: TaskSubmissionCreateComponent;
  let fixture: ComponentFixture<TaskSubmissionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSubmissionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSubmissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
