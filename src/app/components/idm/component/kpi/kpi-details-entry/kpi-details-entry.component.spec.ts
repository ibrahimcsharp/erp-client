import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDetailsEntryComponent } from './kpi-details-entry.component';

describe('KpiDetailsEntryComponent', () => {
  let component: KpiDetailsEntryComponent;
  let fixture: ComponentFixture<KpiDetailsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDetailsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDetailsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
