import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksDeliveryComponent } from './snacks-delivery.component';

describe('SnacksDeliveryComponent', () => {
  let component: SnacksDeliveryComponent;
  let fixture: ComponentFixture<SnacksDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
