import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDoneListComponent } from './task-done-list.component';

describe('TaskDoneListComponent', () => {
  let component: TaskDoneListComponent;
  let fixture: ComponentFixture<TaskDoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
