import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSurveyComponent } from './employee-survey.component';

describe('EmployeeSurveyComponent', () => {
  let component: EmployeeSurveyComponent;
  let fixture: ComponentFixture<EmployeeSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
