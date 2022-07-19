import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private cookieService:CookieService,private router:Router) { }
  authenticateFromCookie():any{
    if(this.cookieService.get("userDetails")){
        return JSON.parse(this.cookieService.get("userDetails"));
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
