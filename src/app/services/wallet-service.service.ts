import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {
  public commonUrl = 'http://172.16.2.110:8080/wallet';
 
  constructor(private httpClient: HttpClient) { }

  rechargeWallet(username:string,pass:string,amount:number):Observable<Wallet>{
    return this.httpClient.put<Wallet>(this.commonUrl+"/recharge/"+amount+"/tocustomer/"+username,{"Authorization":pass},{});
  }
  // details/ofcustomer/{name}
  getWalletDetails(username:string){
    return this.httpClient.get(this.commonUrl+"/details/ofcustomer/"+username);
  }
}
