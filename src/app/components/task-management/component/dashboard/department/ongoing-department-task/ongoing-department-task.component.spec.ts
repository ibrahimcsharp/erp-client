import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingDepartmentTaskComponent } from './ongoing-department-task.component';

describe('OngoingDepartmentTaskComponent', () => {
  let component: OngoingDepartmentTaskComponent;
  let fixture: ComponentFixture<OngoingDepartmentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingDepartmentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingDepartmentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
