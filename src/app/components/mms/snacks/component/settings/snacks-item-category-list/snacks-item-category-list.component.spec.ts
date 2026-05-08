import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksItemCategoryListComponent } from './snacks-item-category-list.component';

describe('SnacksItemCategoryListComponent', () => {
  let component: SnacksItemCategoryListComponent;
  let fixture: ComponentFixture<SnacksItemCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksItemCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksItemCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
