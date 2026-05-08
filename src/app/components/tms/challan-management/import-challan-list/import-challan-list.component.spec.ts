import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportChallanListComponent } from './import-challan-list.component';

describe('ImportChallanListComponent', () => {
  let component: ImportChallanListComponent;
  let fixture: ComponentFixture<ImportChallanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportChallanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportChallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
