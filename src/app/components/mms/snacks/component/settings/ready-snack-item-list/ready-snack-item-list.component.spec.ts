import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadySnackItemListComponent } from './ready-snack-item-list.component';

describe('ReadySnackItemListComponent', () => {
  let component: ReadySnackItemListComponent;
  let fixture: ComponentFixture<ReadySnackItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadySnackItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadySnackItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
