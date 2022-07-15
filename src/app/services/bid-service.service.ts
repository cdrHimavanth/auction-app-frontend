import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidObject } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class BidServiceService {
  public commonUrl = 'http://172.16.2.110:8080/bid/';
  constructor(private httpClient: HttpClient) { }
  bidForItem(name:string,itemId:number,bidAmount:number){
    return this.httpClient.post<any[]>(this.commonUrl+"create/bidder/"+name+"/item/"+itemId,new BidObject(bidAmount));
  }
  highestBidOfItem(itemId:number){
    return this.httpClient.get<any[]>(this.commonUrl+"highestbid/"+itemId);
  }
}
