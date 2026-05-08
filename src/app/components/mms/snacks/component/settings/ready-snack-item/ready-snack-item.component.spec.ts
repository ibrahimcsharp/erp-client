import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadySnackItemComponent } from './ready-snack-item.component';

describe('ReadySnackItemComponent', () => {
  let component: ReadySnackItemComponent;
  let fixture: ComponentFixture<ReadySnackItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadySnackItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadySnackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
