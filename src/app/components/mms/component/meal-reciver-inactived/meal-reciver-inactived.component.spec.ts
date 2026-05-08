import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealReciverInactivedComponent } from './meal-reciver-inactived.component';

describe('MealReciverInactivedComponent', () => {
  let component: MealReciverInactivedComponent;
  let fixture: ComponentFixture<MealReciverInactivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealReciverInactivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealReciverInactivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
