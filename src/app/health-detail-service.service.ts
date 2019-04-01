import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class HealthDetailService {

  constructor(private http:HttpClient) { 
  }

  updateHealthdetails(details:Observable<String>){
    let url = "http://localhost:8080/persistHeathDetails";
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin","*")
    return this.http.post(url,details,{headers:headers,responseType:'text'});
  }
}
