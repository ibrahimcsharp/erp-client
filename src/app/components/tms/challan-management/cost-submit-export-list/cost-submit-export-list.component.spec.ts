import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSubmitExportListComponent } from './cost-submit-export-list.component';

describe('CostSubmitExportListComponent', () => {
  let component: CostSubmitExportListComponent;
  let fixture: ComponentFixture<CostSubmitExportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSubmitExportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSubmitExportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
