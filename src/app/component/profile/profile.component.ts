import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ItemsServiceService } from 'src/app/services/items-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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

    constructor(private breakpointObserver: BreakpointObserver,private cookieService:CookieService,private router:Router, private itemService: ItemsServiceService,private authService:AuthServiceService) {}
    public user : any;
  
    ngOnInit(): void {
      this.user=this.authService.authenticateFromCookie();
      this.assignMyItems();
    }
    assignMyItems(){
      this.myItems = this.itemService.getMyItems(this.user.customerName).subscribe((response)=>{
        console.log(response);
        this.myItems=response;
      },(error)=>{
        console.log(error.error);
      })
    }
    myItems : any;
    logout(){
      this.cookieService.delete("userDetails");
      this.router.navigateByUrl('/login');
    }

}
