import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { LearnerComponent } from './learner/learner.component';
import { AppLoginComponent } from './app-login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppContactComponent } from './app-contact/app-contact.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppAboutUsComponent } from './app-about-us/app-about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDataComponent } from './user-data/user-data.component';
import { BorderDirective } from './border.directive';
import { HideDirective } from './hide.directive';
import { MyhideDirective } from './myhide.directive';

const firebaseConfig = {
    apiKey: "AIzaSyCbd3KkvRhSuYwAeWOJ47BRXevG0N3Vqig",
    authDomain: "ebarun-com-angular-4.firebaseapp.com",
    databaseURL: "https://ebarun-com-angular-4.firebaseio.com",
    projectId: "ebarun-com-angular-4",
    storageBucket: "ebarun-com-angular-4.appspot.com",
    messagingSenderId: "853454513339"
  };

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'dashboard' , pathMatch: 'full'},
    { path: 'home', component:AppDashboardComponent},
    { path: 'aboutus', component:AppAboutUsComponent},
    { path: 'learner', component: LearnerComponent },
    { path: 'dashboard', component: UserDataComponent },
    { path: 'logout', component: AppLoginComponent},
    { path: 'myprofile', component: UserProfileComponent },
    { path: 'contact', component: AppContactComponent },
    {path: '**', component:PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LearnerComponent,
    AppLoginComponent,
    UserProfileComponent,
    AppContactComponent,
    AppDashboardComponent,
    AppAboutUsComponent,
    PageNotFoundComponent,
    UserDataComponent,
    BorderDirective,
    HideDirective,
    MyhideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports:[HideDirective],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
                                            