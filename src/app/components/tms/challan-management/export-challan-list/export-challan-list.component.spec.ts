import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportChallanListComponent } from './export-challan-list.component';

describe('ExportChallanComponent', () => {
  let component: ExportChallanListComponent;
  let fixture: ComponentFixture<ExportChallanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportChallanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportChallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
