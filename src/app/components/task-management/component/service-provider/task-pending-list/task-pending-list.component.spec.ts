import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPendingListComponent } from './task-pending-list.component';

describe('TaskPendingListComponent', () => {
  let component: TaskPendingListComponent;
  let fixture: ComponentFixture<TaskPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
