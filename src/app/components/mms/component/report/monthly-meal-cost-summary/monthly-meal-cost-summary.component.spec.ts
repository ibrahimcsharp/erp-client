import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMealCostSummaryComponent } from './monthly-meal-cost-summary.component';

describe('MonthlyMealCostSummaryComponent', () => {
  let component: MonthlyMealCostSummaryComponent;
  let fixture: ComponentFixture<MonthlyMealCostSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyMealCostSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMealCostSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
