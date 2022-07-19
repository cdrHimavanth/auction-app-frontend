import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Customer, LoginObject, SignupObject } from 'src/app/objects-exporter';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SignupServiceService } from 'src/app/services/signup-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public message:string ="";
  constructor(private router: Router,private fb: FormBuilder,private signupService:SignupServiceService,private cookieService:CookieService) { }
  ngOnInit(): void {
    //this.cookieService.delete("userDetails")
    if(this.cookieService.get("userDetails")){
      this.router.navigateByUrl('/home');
    }
  }
  signupForm = this.fb.group({
    customerName: ['', Validators.required],
    customerMail: ['', Validators.required],
    customerPassword: ['', [Validators.required,Validators.minLength(6)]],
  });
  changeMessage(){
    this.message="";
  }
  onSubmit(){
    this.signupService?.signUpUser(this.signupForm.value).subscribe((response:Customer)=>{
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
