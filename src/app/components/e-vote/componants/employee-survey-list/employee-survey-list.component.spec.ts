import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSurveyListComponent } from './employee-survey-list.component';

describe('EmployeeSurveyListComponent', () => {
  let component: EmployeeSurveyListComponent;
  let fixture: ComponentFixture<EmployeeSurveyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSurveyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
