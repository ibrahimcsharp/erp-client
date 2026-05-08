import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksItemCategoryComponent } from './snacks-item-category.component';

describe('SnacksItemCategoryComponent', () => {
  let component: SnacksItemCategoryComponent;
  let fixture: ComponentFixture<SnacksItemCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnacksItemCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
