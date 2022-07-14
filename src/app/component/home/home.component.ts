import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user : any;
  constructor(private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    if(this.cookieService.get("userDetails")){
      this.user=JSON.parse(this.cookieService.get("userDetails")) ;
      console.log(this.user);
    }else{
      this.router.navigateByUrl('/login');
    }
  }
  logout(){
    this.cookieService.delete("userDetails");
    this.router.navigateByUrl('/login');
  }

}
