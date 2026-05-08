import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaManualProcessComponent } from './tna-manual-process.component';

describe('TnaManualProcessComponent', () => {
  let component: TnaManualProcessComponent;
  let fixture: ComponentFixture<TnaManualProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnaManualProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnaManualProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
