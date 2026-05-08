import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCurrentStatusComponent } from './sp-current-status.component';

describe('SpCurrentStatusComponent', () => {
  let component: SpCurrentStatusComponent;
  let fixture: ComponentFixture<SpCurrentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpCurrentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
