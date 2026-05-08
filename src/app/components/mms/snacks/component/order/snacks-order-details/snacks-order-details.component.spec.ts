import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksOrderDetailsComponent } from './snacks-order-details.component';

describe('SnacksOrderDetailsComponent', () => {
  let component: SnacksOrderDetailsComponent;
  let fixture: ComponentFixture<SnacksOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
