import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginObject } from 'src/app/objects-exporter';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message:string ="";
  constructor(private router: Router,private fb: FormBuilder,private loginService:LoginServiceService,private cookieService:CookieService) { }
  public user:any;
  ngOnInit(): void {
    //this.cookieService.delete("userDetails")
    if(this.cookieService.get("userDetails")){
      this.user=JSON.parse(this.cookieService.get("userDetails")) ;
      console.log(this.user);
      this.router.navigateByUrl('/home');
    }
  }
  loginForm = this.fb.group({
    customerName: ['', Validators.required],
    customerPassword: ['', Validators.required],
  });
  changeMessage(){
    this.message="";
  }
  onSubmit(loginObject:LoginObject){
    this.loginService?.authenticate(loginObject).subscribe((response:any)=>{
      this.cookieService.set("userDetails",JSON.stringify(response));
      this.router.navigateByUrl('/home');
    },
    (error:any)=>{
      if(error.status!==200){
        this.message=error.error.errorMessage;
      }
      console.log(error.error);
    })
  }

}
