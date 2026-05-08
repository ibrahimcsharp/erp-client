import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackMealStatementComponent } from './snack-meal-statement.component';

describe('SnackMealStatementComponent', () => {
  let component: SnackMealStatementComponent;
  let fixture: ComponentFixture<SnackMealStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackMealStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackMealStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
