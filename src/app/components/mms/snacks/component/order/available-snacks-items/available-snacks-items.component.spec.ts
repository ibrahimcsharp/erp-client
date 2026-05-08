import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSnacksItemsComponent } from './available-snacks-items.component';

describe('AvailableSnacksItemsComponent', () => {
  let component: AvailableSnacksItemsComponent;
  let fixture: ComponentFixture<AvailableSnacksItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableSnacksItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSnacksItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
