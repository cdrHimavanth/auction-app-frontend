import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  public commonUrl = 'http://172.16.2.110:8080/item'

  constructor(private httpClient: HttpClient) { }
  
  getAllItems():Observable<any[]>{
    return this.httpClient.get<any[]>(this.commonUrl+"/all");
  }
  getItemsOfOthers(id:number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.commonUrl+"/getothersitemsby/ownerid/"+id);
  }
  getMyItems(name:string):Observable<any[]>{
    return this.httpClient.get<any[]>(this.commonUrl+"/getby/owner/"+name);
  }
}
