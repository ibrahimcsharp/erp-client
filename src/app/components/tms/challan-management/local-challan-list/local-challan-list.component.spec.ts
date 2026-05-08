import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalChallanListComponent } from './local-challan-list.component';

describe('LocalChallanListComponent', () => {
  let component: LocalChallanListComponent;
  let fixture: ComponentFixture<LocalChallanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalChallanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalChallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
