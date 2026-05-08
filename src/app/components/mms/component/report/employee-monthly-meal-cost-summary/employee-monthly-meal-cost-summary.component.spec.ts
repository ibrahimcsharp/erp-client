import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMonthlyMealCostSummaryComponent } from './employee-monthly-meal-cost-summary.component';

describe('EmployeeMonthlyMealCostSummaryComponent', () => {
  let component: EmployeeMonthlyMealCostSummaryComponent;
  let fixture: ComponentFixture<EmployeeMonthlyMealCostSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMonthlyMealCostSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMonthlyMealCostSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
