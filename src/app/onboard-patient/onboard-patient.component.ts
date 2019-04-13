import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-onboard-patient',
  templateUrl: './onboard-patient.component.html',
  styleUrls: ['./onboard-patient.component.css']
})
export class OnboardPatientComponent implements OnInit {

  onboardPatientForm :FormGroup;

  constructor(private fb :FormBuilder,private userService:UserServiceService) { }

  ngOnInit() {
    this.onboardPatientForm = this.fb.group({
      patientLastName : '',
      patientFirstName:'',
      age: ''
     } );
  }

  onboardPatient()
  {
    console.log(this.onboardPatientForm.value);
    console.log("Inside OnboardPatientComponent")
    this.userService.onboardPatient(this.onboardPatientForm.value).subscribe(
      res => {
        console.log("done")
      }
    )
  }

}
