import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksCartManualComponent } from './snacks-cart-manual.component';

describe('SnacksCartManualComponent', () => {
  let component: SnacksCartManualComponent;
  let fixture: ComponentFixture<SnacksCartManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksCartManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksCartManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
