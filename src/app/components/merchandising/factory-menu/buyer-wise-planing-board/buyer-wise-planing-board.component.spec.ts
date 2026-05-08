import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerWisePlaningBoardComponent } from './buyer-wise-planing-board.component';

describe('BuyerWisePlaningBoardComponent', () => {
  let component: BuyerWisePlaningBoardComponent;
  let fixture: ComponentFixture<BuyerWisePlaningBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerWisePlaningBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerWisePlaningBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
