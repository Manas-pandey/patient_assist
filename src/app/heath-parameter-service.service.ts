import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeathParameterServiceService {

  constructor(private client: HttpClient) { }

  getHealthParameters(hospitalId) {
    return this.client.get(`assets/healthParams${hospitalId}.json`);
  }
}
