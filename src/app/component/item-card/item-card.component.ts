import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input('item') public item : any;
  constructor() { }

  ngOnInit(): void {
  }

}
