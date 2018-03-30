import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AuthService]
})
export class UserProfileComponent implements OnInit {
  userName:string;
  userFirstName:string;
  profilePictrue:string;
  items: Observable<any[]>;
  myPost:any;
  localUser:any;
  userEmail:any;
  constructor(public authService: AuthService, db: AngularFirestore, private router:Router) { 
}
ngOnInit () {
      if (localStorage.getItem("userdata") === null) {
          this.router.navigate(['/logout']);
      } else {
      this.localUser = JSON.parse(localStorage.getItem("userdata"));
      this.userFirstName = this.localUser.given_name;
      this.userName = this.localUser.name;
      this.profilePictrue = this.localUser.picture;
      this.userEmail = this.localUser.email;
      }
      
}



  

}
