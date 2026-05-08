import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksManualSaleComponent } from './snacks-manual-sale.component';

describe('SnacksManualSaleComponent', () => {
  let component: SnacksManualSaleComponent;
  let fixture: ComponentFixture<SnacksManualSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksManualSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksManualSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
