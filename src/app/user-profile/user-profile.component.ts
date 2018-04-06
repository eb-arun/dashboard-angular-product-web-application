import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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

  checkRole: any;
  roleInfo:any;
  role:any;

  constructor(public authService: AuthService, private db: AngularFirestore, private router:Router) { 
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
      this.checkRole = this.db.collection("users").doc('all').collection("role", ref => ref.where("roleEmail", '==',this.userEmail));
      this.checkRole.valueChanges().subscribe(res=> {
        this.roleInfo = res[0];
        this.checkRole = this.roleInfo;
        if(this.checkRole == undefined)
        this.checkRole = "Customer";
        else
        this.checkRole = this.roleInfo.roleChoosen;
        localStorage.setItem('roleInfo', this.checkRole);
        this.role = localStorage.getItem('roleInfo');
        console.log('role = ', this.role);
      })
      
      }
      
}



  

}
