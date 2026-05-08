import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksItemListComponent } from './snacks-item-list.component';

describe('SnacksItemListComponent', () => {
  let component: SnacksItemListComponent;
  let fixture: ComponentFixture<SnacksItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
