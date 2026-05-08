import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingFormComponent } from './costing-form.component';

describe('CostingFormComponent', () => {
  let component: CostingFormComponent;
  let fixture: ComponentFixture<CostingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
