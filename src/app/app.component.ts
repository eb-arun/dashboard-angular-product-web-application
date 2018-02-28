import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';


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
     console.log(this.userName, this.userFirstName)
     }
  login() {
    this.authService.loginWithGoogle().then((data) => {
      this.router.navigate(['/myprofile']);
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
