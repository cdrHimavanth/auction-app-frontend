import { Component, Input, OnInit } from '@angular/core';
import { BidServiceService } from 'src/app/services/bid-service.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input('item') public item : any;
  @Input('user') public user : any;
  public message :string ="";
  constructor(private bidService:BidServiceService) { }
  public highestBid:any;
  ngOnInit(): void {
    this.getHighestBid();
  }
  getHighestBid(){
    this.bidService.highestBidOfItem(this.item.itemId).subscribe((response)=>{
      this.highestBid=response;
      this.message="Current bid :" +this.highestBid.bidAmount;
      this.bidsFound=true;
    },(error)=>{
      this.bidsFound=false;
      this.message=error.error.errorMessage;
    })
  }
  public bidsFound=false;
  public showMessage=false;
  mouseEntered(){
    this.showMessage=true;
  }
  mouseLeft(){
    this.showMessage=false;
  }
}
