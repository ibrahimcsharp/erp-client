import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanformComponent } from './challanform.component';

describe('ChallanformComponent', () => {
  let component: ChallanformComponent;
  let fixture: ComponentFixture<ChallanformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
