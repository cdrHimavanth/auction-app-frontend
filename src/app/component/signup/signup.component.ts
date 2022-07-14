import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    if(this.cookieService.get("userDetails")){
      this.router.navigateByUrl('/home');
    }
  }

}
