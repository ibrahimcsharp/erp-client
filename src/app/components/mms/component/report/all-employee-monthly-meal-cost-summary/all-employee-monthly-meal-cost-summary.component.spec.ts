import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeMonthlyMealCostSummaryComponent } from './all-employee-monthly-meal-cost-summary.component';

describe('AllEmployeeMonthlyMealCostSummaryComponent', () => {
  let component: AllEmployeeMonthlyMealCostSummaryComponent;
  let fixture: ComponentFixture<AllEmployeeMonthlyMealCostSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmployeeMonthlyMealCostSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeeMonthlyMealCostSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
