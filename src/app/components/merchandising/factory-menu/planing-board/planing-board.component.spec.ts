import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningBoardComponent } from './planing-board.component';

describe('PlaningBoardComponent', () => {
  let component: PlaningBoardComponent;
  let fixture: ComponentFixture<PlaningBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaningBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaningBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
