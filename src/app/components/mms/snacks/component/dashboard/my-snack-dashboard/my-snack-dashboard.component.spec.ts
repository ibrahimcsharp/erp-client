import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnackDashboardComponent } from './my-snack-dashboard.component';

describe('MySnackDashboardComponent', () => {
  let component: MySnackDashboardComponent;
  let fixture: ComponentFixture<MySnackDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySnackDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnackDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
