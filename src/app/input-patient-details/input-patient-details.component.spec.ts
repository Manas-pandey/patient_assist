import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPatientDetailsComponent } from './input-patient-details.component';

describe('InputPatientDetailsComponent', () => {
  let component: InputPatientDetailsComponent;
  let fixture: ComponentFixture<InputPatientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPatientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
