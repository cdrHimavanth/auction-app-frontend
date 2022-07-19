import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  public commonUrl = 'http://172.16.2.110:8080/customer/'
  constructor(private httpClient: HttpClient) { }
  // acceptbidforitem/{itemId}/user/{name}
  
  acceptBid(name:string,itemId:number,pass:string){
    return this.httpClient.put((this.commonUrl+"acceptbidforitem/"+itemId+"/user/"+name),{},{});
  }
}
