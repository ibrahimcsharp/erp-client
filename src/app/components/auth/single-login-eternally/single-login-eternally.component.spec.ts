import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLoginEternallyComponent } from './single-login-eternally.component';

describe('SingleLoginEternallyComponent', () => {
  let component: SingleLoginEternallyComponent;
  let fixture: ComponentFixture<SingleLoginEternallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLoginEternallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLoginEternallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
