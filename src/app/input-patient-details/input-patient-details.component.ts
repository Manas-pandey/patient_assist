import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HealthDetailService } from '../health-detail-service.service';
import { UserServiceService } from '../user-service.service';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-input-patient-details',
  templateUrl: './input-patient-details.component.html',
  styleUrls: ['./input-patient-details.component.css']
})
export class InputPatientDetailsComponent implements OnInit {

  inputForm: FormGroup; // hfgfh
  hospitalId: number;
  validhospitalId :boolean = false;
  response:any;


  constructor(private fb: FormBuilder,private service:HealthDetailService, private userService:UserServiceService,public snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute) { }

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
      sponBreath: [],
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
    
    details.forEach(element => {
      element.time = new Date(element.time).getTime();
      element.hospitalId = this.hospitalId;
      
    });
    console.log(details);
    this.service.updateHealthdetails(details).subscribe((res) => {
      console.log(res);
      this.openSnackBar("Health deatils saved !!","End");
      console.log('snackbar')
      // this.router.navigate(['/input'])
      this.onRefresh();
      console.log('route')
      
    });
  }

  deleteHeathParameter(i) {
    this.heathParameterArray.removeAt(i)
  }

  validaHospitalId(){
    this.response = this.userService.getPatientHospitalId(this.hospitalId).subscribe((res) => {

      if(res !== null){
          this.validhospitalId = true
      }  
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      // verticalPosition: 'top',
      // horizontalPosition: 'end',
      // panelClass: ['green-snackbar'],

    });
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
    let currentUrl = this.router.url ;
  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
    }
}
