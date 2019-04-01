import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-onboard-patient',
  templateUrl: './onboard-patient.component.html',
  styleUrls: ['./onboard-patient.component.css']
})
export class OnboardPatientComponent implements OnInit {

  onboardPatientForm :FormGroup;

  constructor(private fb :FormBuilder) { }

  ngOnInit() {
    this.onboardPatientForm = this.fb.group({
      hospitalId : '',
      patientName:'',
      age: ''
     } );
  }

  onboardPatient()
  {
    console.log(this.onboardPatientForm);
  }

}
