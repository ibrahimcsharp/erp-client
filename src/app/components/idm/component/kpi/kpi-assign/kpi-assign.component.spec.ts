import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiAssignComponent } from './kpi-assign.component';

describe('KpiAssignComponent', () => {
  let component: KpiAssignComponent;
  let fixture: ComponentFixture<KpiAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
