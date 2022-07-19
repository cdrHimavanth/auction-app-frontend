import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ItemsServiceService } from 'src/app/services/items-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Customer, Item } from 'src/app/objects-exporter';

@Component({
  selector: 'app-ng-navbar',
  templateUrl: './ng-navbar.component.html',
  styleUrls: ['./ng-navbar.component.css']
})
export class NgNavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private cookieService:CookieService,private router:Router, private itemService: ItemsServiceService,private authService:AuthServiceService) {
    this.user=this.authService.authenticateFromCookie();
  }
  public user : Customer;

  ngOnInit(): void {
    
    this.assignOthersItems();
  }
  assignMyItems(){
      this.itemService.getMyItems(this.user.customerName).subscribe((response)=>{
      console.log(response);
      this.myItems=response;
    },(error)=>{
      console.log(error.error);
    })
  }
  assignOthersItems(){
      this.itemService.getItemsOfOthers(this.user.customerId).subscribe((response)=>{
      console.log(response);
      this.items=response;
    },(error)=>{
      console.log(error.error);
    })
  }
  items : Item[]=[];
  myItems : Item[]=[];
  logout(){
    this.cookieService.delete("userDetails");
    this.router.navigateByUrl('/login');
  }

}
