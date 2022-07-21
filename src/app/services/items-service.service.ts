import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemDto } from '../objects-exporter';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  public commonUrl = 'http://172.16.2.110:8080/item'

  constructor(private httpClient: HttpClient) { }
  
  getAllItems():Observable<any[]>{
    return this.httpClient.get<Item[]>(this.commonUrl+"/all");
  }
  getItemsOfOthers(id:number):Observable<Item[]>{
    return this.httpClient.get<Item[]>(this.commonUrl+"/getothersitemsby/ownerid/"+id);
  }
  getMyItems(name:string):Observable<Item[]>{
    return this.httpClient.get<Item[]>(this.commonUrl+"/getby/owner/"+name);
  }
  createItem(name:string,body:any):Observable<Item>{
    return this.httpClient.post<Item>((this.commonUrl+"/additem/owner/"+name),body);
  }
}
