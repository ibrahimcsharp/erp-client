import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackDamageListComponent } from './snack-damage-list.component';

describe('SnackDamageListComponent', () => {
  let component: SnackDamageListComponent;
  let fixture: ComponentFixture<SnackDamageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackDamageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackDamageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
