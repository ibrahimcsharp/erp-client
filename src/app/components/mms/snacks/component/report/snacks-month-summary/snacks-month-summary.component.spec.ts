import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksMonthSummaryComponent } from './snacks-month-summary.component';

describe('SnacksMonthSummaryComponent', () => {
  let component: SnacksMonthSummaryComponent;
  let fixture: ComponentFixture<SnacksMonthSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksMonthSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
