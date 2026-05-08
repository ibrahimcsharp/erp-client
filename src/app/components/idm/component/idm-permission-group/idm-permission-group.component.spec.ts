import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdmPermissionGroupComponent } from './idm-permission-group.component';

describe('IdmPermissionGroupComponent', () => {
  let component: IdmPermissionGroupComponent;
  let fixture: ComponentFixture<IdmPermissionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdmPermissionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdmPermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
