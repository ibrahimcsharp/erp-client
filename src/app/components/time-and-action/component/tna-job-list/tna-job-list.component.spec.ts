import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaJobListComponent } from './tna-job-list.component';

describe('TnaJobListComponent', () => {
  let component: TnaJobListComponent;
  let fixture: ComponentFixture<TnaJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnaJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnaJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
