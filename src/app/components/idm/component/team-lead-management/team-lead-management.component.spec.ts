import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadManagementComponent } from './team-lead-management.component';

describe('TeamLeadManagementComponent', () => {
  let component: TeamLeadManagementComponent;
  let fixture: ComponentFixture<TeamLeadManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeadManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeadManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
