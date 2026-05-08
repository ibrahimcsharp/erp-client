import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackIndStatementPayableComponent } from './snack-ind-statement-payable.component';

describe('SnackIndStatementPayableComponent', () => {
  let component: SnackIndStatementPayableComponent;
  let fixture: ComponentFixture<SnackIndStatementPayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackIndStatementPayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackIndStatementPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
