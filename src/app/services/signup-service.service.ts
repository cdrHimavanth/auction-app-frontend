import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupObject } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  public commonUrl = 'http://172.16.2.110:8080'
  constructor(private httpClient: HttpClient) { 
    
  }
  signUpUser(signupObject:SignupObject):Observable<any>{
    return this.httpClient.post<any>(this.commonUrl+"/customer/create",signupObject);
  }
}
