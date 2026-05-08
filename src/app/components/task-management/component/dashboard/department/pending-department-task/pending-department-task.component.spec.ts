import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDepartmentTaskComponent } from './pending-department-task.component';

describe('PendingDepartmentTaskComponent', () => {
  let component: PendingDepartmentTaskComponent;
  let fixture: ComponentFixture<PendingDepartmentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDepartmentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDepartmentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
