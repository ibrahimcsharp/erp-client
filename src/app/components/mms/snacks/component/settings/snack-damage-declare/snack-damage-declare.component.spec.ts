import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackDamageDeclareComponent } from './snack-damage-declare.component';

describe('SnackDamageDeclareComponent', () => {
  let component: SnackDamageDeclareComponent;
  let fixture: ComponentFixture<SnackDamageDeclareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackDamageDeclareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackDamageDeclareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
