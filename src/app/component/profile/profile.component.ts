import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ItemsServiceService } from 'src/app/services/items-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Customer, Item } from 'src/app/objects-exporter';
import { WalletServiceService } from 'src/app/services/wallet-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private walletService:WalletServiceService,private breakpointObserver: BreakpointObserver,private cookieService:CookieService,private router:Router, private itemService: ItemsServiceService,private authService:AuthServiceService) {
      this.user=this.authService.authenticateFromCookie();
      this.walletDetails=this.walletService.getWalletDetails(this.user.customerName).subscribe((respone)=>{
        this.walletDetails=respone;
      },(error)=>{
        console.log(error);
      })
    }
    public user : Customer;
    public walletDetails:any;
  
    ngOnInit(): void {
      
      this.assignMyItems();
    }
    assignMyItems(){
        this.itemService.getMyItems(this.user.customerName).subscribe((response)=>{
        this.myItems=response;
      },(error)=>{
        //console.log(error.error);
      })
    }
    public balance :any;
    public myItems : Item[]=[];
    logout(){
      this.cookieService.delete("userDetails");
      this.router.navigateByUrl('/login');
    }
    disableAddBalance:boolean =true;
    inpChanged(){
      if(this.balance===undefined || this.balance == null){
        this.disableAddBalance=true;
      }else if(this.balance==0){
        this.disableAddBalance=true;
      }else{
        this.disableAddBalance=false;
      }
    }
    addBalance(){
      this.walletService.rechargeWallet(this.user.customerName,this.user.customerPassword,this.balance).subscribe((response)=>{
        // window.location.reload()
        this.walletDetails.availableBalance= this.balance+this.walletDetails.availableBalance;
        this.walletDetails.walletBalance= response.walletBalance;
        this.balance=0;
        this.disableAddBalance=true;
      },(error)=>{
        alert(error.error.errorMessage);
      })
      
    }
    changeIt(val:number){}

}
