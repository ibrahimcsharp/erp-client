import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeSyncComponent } from './all-employee-sync.component';

describe('AllEmployeeSyncComponent', () => {
  let component: AllEmployeeSyncComponent;
  let fixture: ComponentFixture<AllEmployeeSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmployeeSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeeSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
