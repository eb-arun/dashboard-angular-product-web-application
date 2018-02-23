import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AngularFireAuth]
})
export class AppLoginComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

 login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(this.afAuth.authState);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
