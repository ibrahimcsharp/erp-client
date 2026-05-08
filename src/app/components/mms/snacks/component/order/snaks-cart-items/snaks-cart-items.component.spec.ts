import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnaksCartItemsComponent } from './snaks-cart-items.component';

describe('SnaksCartItemsComponent', () => {
  let component: SnaksCartItemsComponent;
  let fixture: ComponentFixture<SnaksCartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnaksCartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnaksCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
