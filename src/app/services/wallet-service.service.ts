import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {
  public commonUrl = 'http://172.16.2.110:8080/wallet';
 
  constructor(private httpClient: HttpClient) { }

  rechargeWallet(username:string,pass:string,amount:number){
    return this.httpClient.put(this.commonUrl+"/recharge/"+amount+"/tocustomer/"+username,{"Authorization":pass},{});
  }
}
