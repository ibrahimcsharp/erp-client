import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentListComponent } from './task-comment-list.component';

describe('TaskCommentListComponent', () => {
  let component: TaskCommentListComponent;
  let fixture: ComponentFixture<TaskCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
