import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeathParameterServiceService {

  constructor(private client: HttpClient) { }

  getHealthParameters(hospitalId) {
        
    // return this.client.get(`assets/healthParams${hospitalId}.json`);
    let url = "http://localhost:8080/getHeathDetails/";
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin","*");
    return this.client.get(`${url}${hospitalId}`,{headers:headers});
  }
}
