import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSubmitLocalListComponent } from './cost-submit-local-list.component';

describe('CostSubmitLocalListComponent', () => {
  let component: CostSubmitLocalListComponent;
  let fixture: ComponentFixture<CostSubmitLocalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSubmitLocalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSubmitLocalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
