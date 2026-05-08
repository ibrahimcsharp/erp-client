import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksReceivedHistoryComponent } from './snacks-received-history.component';

describe('SnacksReceivedHistoryComponent', () => {
  let component: SnacksReceivedHistoryComponent;
  let fixture: ComponentFixture<SnacksReceivedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksReceivedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksReceivedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
