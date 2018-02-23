import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})
export class AppComponent implements OnInit {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            this.router.navigate(['/myprofile']);
          }
          else {
            this.userDetails = null;
          }
        }
      );
   }

  title = 'Started !';
   ngOnInit() { 
    console.log(this.user);
     }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
