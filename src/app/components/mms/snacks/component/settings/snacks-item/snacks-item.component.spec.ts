import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksItemComponent } from './snacks-item.component';

describe('SnacksItemComponent', () => {
  let component: SnacksItemComponent;
  let fixture: ComponentFixture<SnacksItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
