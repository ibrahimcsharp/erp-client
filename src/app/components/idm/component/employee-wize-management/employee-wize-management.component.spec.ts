import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWizeManagementComponent } from './employee-wize-management.component';

describe('EmployeeWizeManagementComponent', () => {
  let component: EmployeeWizeManagementComponent;
  let fixture: ComponentFixture<EmployeeWizeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWizeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWizeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
