import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalFormComponent } from './arrival-form.component';

describe('ArrivalFormComponent', () => {
  let component: ArrivalFormComponent;
  let fixture: ComponentFixture<ArrivalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
