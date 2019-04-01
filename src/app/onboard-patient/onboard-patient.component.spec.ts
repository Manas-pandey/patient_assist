import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardPatientComponent } from './onboard-patient.component';

describe('OnboardPatientComponent', () => {
  let component: OnboardPatientComponent;
  let fixture: ComponentFixture<OnboardPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
