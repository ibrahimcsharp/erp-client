import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingFormImportComponent } from './costing-form-import.component';

describe('CostingFormImportComponent', () => {
  let component: CostingFormImportComponent;
  let fixture: ComponentFixture<CostingFormImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostingFormImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingFormImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
