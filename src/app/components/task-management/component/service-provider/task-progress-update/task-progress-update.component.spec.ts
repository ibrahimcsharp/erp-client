import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProgressUpdateComponent } from './task-progress-update.component';

describe('TaskProgressUpdateComponent', () => {
  let component: TaskProgressUpdateComponent;
  let fixture: ComponentFixture<TaskProgressUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskProgressUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProgressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
