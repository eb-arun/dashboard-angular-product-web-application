import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AngularFireAuth]
})
export class AppComponent implements OnInit {
  userName:string;
  userFirstName:string;

  constructor(public authService: AuthService, private router: Router) { }
  title = 'Started !';
   ngOnInit() { 
     this.userName = this.authService.currentUserDisplayName;
     this.userFirstName = this.authService.getFirstName(this.userName);
     console.log(this.userName, this.userFirstName);
     if (localStorage.getItem("userdata") === null) {
          this.router.navigate(['/logout']);
      }
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
    this.router.navigate(['/logout']);
  }
}
