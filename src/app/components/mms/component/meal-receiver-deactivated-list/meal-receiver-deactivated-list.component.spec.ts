import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealReceiverDeactivatedListComponent } from './meal-receiver-deactivated-list.component';

describe('MealReceiverDeactivatedListComponent', () => {
  let component: MealReceiverDeactivatedListComponent;
  let fixture: ComponentFixture<MealReceiverDeactivatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealReceiverDeactivatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealReceiverDeactivatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
