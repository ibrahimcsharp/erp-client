import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaDashboardComponent } from './tna-dashboard.component';

describe('TnaDashboardComponent', () => {
  let component: TnaDashboardComponent;
  let fixture: ComponentFixture<TnaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
