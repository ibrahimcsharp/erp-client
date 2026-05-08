import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSubmitImportListComponent } from './cost-submit-import-list.component';

describe('CostSubmitImportListComponent', () => {
  let component: CostSubmitImportListComponent;
  let fixture: ComponentFixture<CostSubmitImportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSubmitImportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSubmitImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
