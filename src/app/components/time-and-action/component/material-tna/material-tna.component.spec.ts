import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTnaComponent } from './material-tna.component';

describe('MaterialTnaComponent', () => {
  let component: MaterialTnaComponent;
  let fixture: ComponentFixture<MaterialTnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
