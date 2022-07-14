import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginObject } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public commonUrl = 'http://172.16.2.110:8080'

  constructor(private httpClient: HttpClient) { }

  authenticate(loginObject:LoginObject):Observable<any>{
    return this.httpClient.put<any>(this.commonUrl+"/customer/login",loginObject);
  }
  getAllUserDto():Observable<any[]>{
    return this.httpClient.get<any[]>(this.commonUrl+"/customer/all");
  }
}
