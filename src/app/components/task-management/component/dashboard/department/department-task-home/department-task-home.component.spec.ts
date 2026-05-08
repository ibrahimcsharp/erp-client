import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTaskHomeComponent } from './department-task-home.component';

describe('DepartmentTaskHomeComponent', () => {
  let component: DepartmentTaskHomeComponent;
  let fixture: ComponentFixture<DepartmentTaskHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTaskHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTaskHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
