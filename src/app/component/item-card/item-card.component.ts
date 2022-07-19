import { Component, Input, OnInit } from '@angular/core';
import { BidServiceService } from 'src/app/services/bid-service.service';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input('item') public item : any;
  @Input('user') public user : any;
  public message :string ="";
  constructor(private customerService:CustomerServiceService,private bidService:BidServiceService) { }
  public highestBid:any;
  public amountToBeBiddedFor:number = 0;
  ngOnInit(): void {
    this.getHighestBid();
  }
  getHighestBid(){
    this.bidService.highestBidOfItem(this.item.itemId).subscribe((response)=>{
      this.highestBid=response;
      this.message="Current bid :" +this.highestBid.bidAmount;
      this.amountToBeBiddedFor = (this.highestBid.bidAmount+((this.item.itemStartPrice)/10));
      this.bidsFound=true;
    },(error)=>{
      this.bidsFound=false;
      this.amountToBeBiddedFor = this.item.itemStartPrice+( (this.item.itemStartPrice)/10);
      this.message=error.error.errorMessage;
    })
  }
  public bidsFound=false;
  public showMessage=false;
  public errMessage="";
  public isFailed=false;
  
  bidIt(){
    this.bidService.bidForItem(this.user.customerName,this.item.itemId,this.amountToBeBiddedFor).subscribe((response)=>{
      console.log(response);
      window.location.reload()
    },(error)=>{
      this.errMessage=error.error.errorMessage;
      this.isFailed=true;
      setTimeout(this.resetMessage,5000);
    })
  }
  resetMessage(){
    this.errMessage="";
  }
  acceptBid(){
    this.customerService.acceptBid(this.user.customerName,this.item.itemId,this.user.customerPassword).subscribe((res)=>{
      window.location.reload()
    },(err)=>{
      window.location.reload()
    })
  }
}
