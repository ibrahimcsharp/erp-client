import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackIndStatementComponent } from './snack-ind-statement.component';

describe('SnackIndStatementComponent', () => {
  let component: SnackIndStatementComponent;
  let fixture: ComponentFixture<SnackIndStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackIndStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackIndStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
