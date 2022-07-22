import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
      public user:any;
  constructor(private breakpointObserver: BreakpointObserver,private cookieService:CookieService,private router:Router,private authService:AuthServiceService) {
    this.user=this.authService.authenticateFromCookie();
  }
  logout(){
    this.cookieService.delete("userDetails");
    this.router.navigateByUrl('/login');
  }
  // public word=""
  // addWord(par:string){
  //   this.word=this.word+par;
  // }
  // text=("If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.").split(" ").forEach(element => {
  //   setTimeout(this.word=this.word+element, 1000);
  // })
  

}
