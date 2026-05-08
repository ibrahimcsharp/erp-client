import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionSetupComponent } from './composition-setup.component';

describe('CompositionSetupComponent', () => {
  let component: CompositionSetupComponent;
  let fixture: ComponentFixture<CompositionSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositionSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
