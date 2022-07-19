import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, SignupObject } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  public commonUrl = 'http://172.16.2.110:8080'
  constructor(private httpClient: HttpClient) { 
    
  }
  signUpUser(signupObject:SignupObject):Observable<Customer>{
    return this.httpClient.post<Customer>(this.commonUrl+"/customer/create",signupObject);
  }
}
