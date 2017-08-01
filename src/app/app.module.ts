import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LearnerComponent } from './learner/learner.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppContactComponent } from './app-contact/app-contact.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppAboutUsComponent } from './app-about-us/app-about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDataComponent } from './user-data/user-data.component';
import { BorderDirective } from './border.directive';
import { HideDirective } from './hide.directive';
import { MyhideDirective } from './myhide.directive';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home' , pathMatch: 'full'},
    { path: 'home', component:AppDashboardComponent},
    { path: 'aboutus', component:AppAboutUsComponent},
    { path: 'learner', component: LearnerComponent },
    { path: 'dashboard', component: AppDashboardComponent },
    { path: 'myprofile', component: UserProfileComponent },
    { path: 'contact', component: AppContactComponent },
    { path: 'users-list', component: UserDataComponent },
    {path: '**', component:PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LearnerComponent,
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
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports:[HideDirective],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
                                            