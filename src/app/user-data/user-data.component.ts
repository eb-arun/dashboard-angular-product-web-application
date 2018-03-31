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
  name: string;
  oil_history: string;
  email: string;
}
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  providers: [AuthService]
})

export class UserDataComponent {
  userName: string;
  userFirstName: string;
  profilePictrue: string;
  userEmail: any;
  hero;
  oilData: any;
  userData: AngularFirestoreCollection<Post>;
  userDoc: Observable<any>;
  checkData: any;
  localUser: any;

  cusNickName: any;
  cusOil: any;
  cusQuantity: any;
  cusEmailId: any;
  purchasedDate: any;
  cusPrice: any;
  cusStore: Object;
  myFood = 'lamb';
  saveToStore:AngularFirestoreCollection<any>;

  constructor(public authService: AuthService, private db: AngularFirestore, private router: Router) {
  }
  ngOnInit() {

    if (localStorage.getItem("userdata") === null) {
      this.router.navigate(['/logout']);
    } else {
      this.localUser = JSON.parse(localStorage.getItem("userdata"));
      this.saveToStore = this.db.collection("users");
      console.log(this.localUser.email, "local");
      this.userFirstName = this.localUser.given_name;
      this.userEmail = this.localUser.email;
      this.userData = this.db.collection("users", ref => ref.where("email", '==', this.userEmail));
      this.userDoc = this.db.collection("users").doc("arun").snapshotChanges();
      this.userData.valueChanges().subscribe(res => {
        this.checkData = res[0];
        console.log(res, this.checkData, "db");
      });
    }
  }

  addEntry() {
    this.cusStore = {
      "name": this.cusNickName,
      "role": "customer",
      "email": this.cusEmailId,
      "oil_history": {
        "price": this.cusPrice,
        "product": this.cusOil,
        "quantity": this.cusQuantity,
        "purchased": this.purchasedDate
      }
    }
    this.saveToStore.doc("today").set({
      "name": this.cusNickName,
      "role": "customer",
      "email": this.cusEmailId,
      "oil_history": {
        "price": this.cusPrice,
        "product": this.cusOil,
        "quantity": this.cusQuantity,
        "purchased": this.purchasedDate
      }
    });
    console.log("saved", this.cusStore, this.cusOil, this.myFood);
  }



}
