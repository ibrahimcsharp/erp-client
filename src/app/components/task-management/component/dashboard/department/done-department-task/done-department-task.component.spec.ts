import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneDepartmentTaskComponent } from './done-department-task.component';

describe('DoneDepartmentTaskComponent', () => {
  let component: DoneDepartmentTaskComponent;
  let fixture: ComponentFixture<DoneDepartmentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneDepartmentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneDepartmentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
