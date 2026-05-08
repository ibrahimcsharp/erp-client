import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackCurrentStockComponent } from './snack-current-stock.component';

describe('SnackCurrentStockComponent', () => {
  let component: SnackCurrentStockComponent;
  let fixture: ComponentFixture<SnackCurrentStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackCurrentStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackCurrentStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
