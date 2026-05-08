import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaProcessListComponent } from './tna-process-list.component';

describe('TnaProcessListComponent', () => {
  let component: TnaProcessListComponent;
  let fixture: ComponentFixture<TnaProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnaProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnaProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
