import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth) { }
  title = 'Started !';
  user = firebase.auth().currentUser;
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(this.afAuth.authState);
    console.log(this.user);

  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
