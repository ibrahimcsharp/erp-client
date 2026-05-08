import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorWelcomeComponent } from './visitor-welcome.component';

describe('VisitorWelcomeComponent', () => {
  let component: VisitorWelcomeComponent;
  let fixture: ComponentFixture<VisitorWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
