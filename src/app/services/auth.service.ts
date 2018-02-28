import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router } from '@angular/router';

@Injectable()
export class AuthService {
  authState: any = null;
  constructor(public af: AngularFireAuth) {
    this.af.authState.subscribe((auth) => {
              this.authState = auth
            });
   }
  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    return this.af.auth.signOut();
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.af.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }
  getFirstName(fullname){
    var getSpace = fullname.search(" ");
    var FirstName = fullname.substring(0,getSpace);
    return FirstName;
  }
  get currentUserFirstName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.getFirstName(this.authState['displayName']) || 'User without a Name' }
  }
  get currentUserEmailName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['email'] || 'User without a Name' }
  }
  get currentUserDisplayPicture(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['photoURL'] || 'User without a Name' }
  }

}
