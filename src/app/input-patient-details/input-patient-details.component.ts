import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HealthDetailService } from '../health-detail-service.service';


@Component({
  selector: 'app-input-patient-details',
  templateUrl: './input-patient-details.component.html',
  styleUrls: ['./input-patient-details.component.css']
})
export class InputPatientDetailsComponent implements OnInit {

  inputForm: FormGroup;
  hospitalId: number

  constructor(private fb: FormBuilder,private service:HealthDetailService) { }

  ngOnInit() {
    this.inputForm = this.fb.group({
 
      heathParameters: this.fb.array([])

    })
  }

  get heathParameterArray() {
    return this.inputForm.get('heathParameters') as FormArray
  }

  addHeathParameter() {

    const heathparams = this.fb.group({
      respiratoryRate: [],
      hospitalId: this.hospitalId,
      heartRate: [],
      imv: [],
      paCo2: [],
      hCo3: [],
      spO2: [],
      saO2: [],
      time: []
    });

    this.heathParameterArray.push(heathparams);
  }

  onSubmit() {
    let details = this.inputForm.value.heathParameters;
    this.service.updateHealthdetails(details).subscribe((res) => {
      console.log(res);
    });
  }

  deleteHeathParameter(i) {
    this.heathParameterArray.removeAt(i)
  }

}


