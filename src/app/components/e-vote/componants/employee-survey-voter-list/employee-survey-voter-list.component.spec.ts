import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSurveyVoterListComponent } from './employee-survey-voter-list.component';

describe('EmployeeSurveyVoterListComponent', () => {
  let component: EmployeeSurveyVoterListComponent;
  let fixture: ComponentFixture<EmployeeSurveyVoterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSurveyVoterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSurveyVoterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
