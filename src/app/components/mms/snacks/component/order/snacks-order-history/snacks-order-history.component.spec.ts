import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksOrderHistoryComponent } from './snacks-order-history.component';

describe('SnacksOrderHistoryComponent', () => {
  let component: SnacksOrderHistoryComponent;
  let fixture: ComponentFixture<SnacksOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
