import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskExternalComponent } from './assign-task-external.component';

describe('AssignTaskExternalComponent', () => {
  let component: AssignTaskExternalComponent;
  let fixture: ComponentFixture<AssignTaskExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTaskExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
