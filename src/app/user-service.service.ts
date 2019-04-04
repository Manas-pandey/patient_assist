import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"

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

  
}
