import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AngularFireAuth]
})
export class AppComponent implements OnInit {
  userName:string;
  userFirstName:string;

  public constructor(public authService: AuthService, private router: Router, public titleService:Title) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        switch (event.url){
          case '/dashboard':
            this.setTitle('Dashboard ::: Product');
            break;
            case '/myprofile':
            this.setTitle('My Profile ::');
            break;
            case '/contact':
            this.setTitle('Contact Us ::');
            break;
            case '/logout':
            this.setTitle('Logged Out of Application ::');
            break;
          default:
            this.setTitle('Firebase & Angular');
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
   }
   ngOnInit() { 
     this.userName = this.authService.currentUserDisplayName;
     this.userFirstName = this.authService.getFirstName(this.userName);
     console.log(this.userName, this.userFirstName);
     if (localStorage.getItem("userdata") === null) {
          this.router.navigate(['/logout']);
      }
     }
     public setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
    }
  login() {
    this.authService.loginWithGoogle().then((data) => {
      localStorage.setItem('userdata' , JSON.stringify(data.additionalUserInfo.profile));
      console.log(data.additionalUserInfo.profile);
      this.router.navigate(['/myprofile']);
    })
  }
  logout() {
    this.authService.logout();
    localStorage.removeItem('userdata'); 
    localStorage.removeItem('roleInfo');   
    this.router.navigate(['/logout']);
  }
}
