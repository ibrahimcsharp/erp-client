import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerWiseUiListPermissionComponent } from './buyer-wise-ui-list-permission.component';

describe('BuyerWiseUiListPermissionComponent', () => {
  let component: BuyerWiseUiListPermissionComponent;
  let fixture: ComponentFixture<BuyerWiseUiListPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerWiseUiListPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerWiseUiListPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
