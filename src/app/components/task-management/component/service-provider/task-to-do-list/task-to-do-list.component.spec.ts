import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToDoListComponent } from './task-to-do-list.component';

describe('TaskToDoListComponent', () => {
  let component: TaskToDoListComponent;
  let fixture: ComponentFixture<TaskToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskToDoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
