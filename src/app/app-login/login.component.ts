import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

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
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
