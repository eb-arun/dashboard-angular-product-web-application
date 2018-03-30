import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AngularFireAuth]
})
export class AppLoginComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public logIn:AppComponent) { }

  ngOnInit() {
  }

 login() {
    this.logIn.login();
  }
  
}
