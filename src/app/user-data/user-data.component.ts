import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { RouterModule, Routes, Router } from '@angular/router';

interface Post {
  title: string;
  content: string;
  name:string;
  oil_history:string;
  email:string;
}
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  providers: [AuthService]
})

export class UserDataComponent {
  userName:string;
  userFirstName:string;
  profilePictrue:string;
  userEmail:any;
  hero;
  oilData: any;
  userData: AngularFirestoreCollection<Post>;
  userDoc:Observable<any>;
  posts: any;
  checkData:any;
  localUser:any;
  constructor(public authService: AuthService, private db: AngularFirestore, private router:Router) { 
  }
  ngOnInit () {
      this.userData = this.db.collection("users");
      this.userDoc = this.db.collection("users").doc("arun").snapshotChanges();
     this.userData.valueChanges().subscribe(res =>{
         this.checkData = res.find(x=>x.email ==this.userEmail);
         console.log(res , this.checkData, "db");
      });
      console.log(this.posts, "Chek");
      if (localStorage.getItem("userdata") === null) {
          this.router.navigate(['/logout']);
      } else {
      this.localUser = JSON.parse(localStorage.getItem("userdata"));
      console.log(this.localUser.email, "local");
      this.userFirstName = this.localUser.given_name;
      this.userEmail = this.localUser.email;
      }
}

 

}
