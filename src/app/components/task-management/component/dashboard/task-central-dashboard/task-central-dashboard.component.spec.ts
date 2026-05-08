import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCentralDashboardComponent } from './task-central-dashboard.component';

describe('TaskCentralDashboardComponent', () => {
  let component: TaskCentralDashboardComponent;
  let fixture: ComponentFixture<TaskCentralDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCentralDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCentralDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
