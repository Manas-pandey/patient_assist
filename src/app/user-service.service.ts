import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { 
  }
  
  getPatientHospitalId(hospitalId:number)
  {
    let url = "http://localhost:8080/getRegisteredUser/";
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin","*")

    return this.http.get<string>(`${url}${hospitalId}`,{headers:headers});
  }

  onboardPatient(patientInfo:PatientInfo)
  {
    console.log("Inside onPatient service")
    console.log(patientInfo)
    let url = "http://localhost:8080/onboardUser"
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin","*")
    return this.http.post<PatientInfo>(url,patientInfo,{headers:headers})
    
  }

  
}

export interface PatientInfo{
  age: number;
  patientFirstName: string;
  patientLastName: string

}
