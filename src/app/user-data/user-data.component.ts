import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  allData: AngularFirestoreCollection<Post>;
  allDataObs: Observable<any>;
  checkData: any;
  localUser: any;
  allDataRes: any;

  cusNickName: any;
  cusOil: any;
  cusQuantity: any;
  cusEmailId: any;
  purchasedDate: any;
  cusPrice: any;
  cusStore: Object;
  saveToStore: AngularFirestoreCollection<any>;
  cusData:AngularFirestoreCollection<any>;
  cusDataRes:any;
  cusPayment:any;

  dateNow: Date = new Date();

  roleName: any;
  roleEmail: any;
  roleChoosen: any;
  roleStore: any;
  roleEntry: FormGroup;
  submitted: any;
  role: any;

  constructor(public authService: AuthService, private db: AngularFirestore, private router: Router, private fb: FormBuilder) {
  }
  ngOnInit() {

    if (localStorage.getItem("userdata") === null) {
      this.router.navigate(['/logout']);
    } else {
      this.localUser = JSON.parse(localStorage.getItem("userdata"));
      this.role = localStorage.getItem('roleInfo');
      console.log('role = ', this.role);
      this.saveToStore = this.db.collection("users");
      this.userFirstName = this.localUser.given_name;
      this.userEmail = this.localUser.email;

      switch (this.role) {
        case 'Admin':
          this.userData = this.db.collection("users", ref => ref.where("email", '==', this.userEmail));
          this.userData.valueChanges().subscribe(res => {
            this.checkData = res[0];
            console.log(res, this.checkData, "db");
          });
          this.allData = this.db.collection("users").doc("all").collection('oil_data');
          this.allData.valueChanges().subscribe(resData => {
            this.allDataRes = resData;
            console.log(resData, "all_oil_data");
          });
          break;
        case 'Customer':
          this.cusData = this.db.collection("users").doc("all").collection("oil_data", ref=>ref.where('email', '==', this.userEmail));
          this.cusData.valueChanges().subscribe(resData => {
            this.cusDataRes = resData;
            console.log(resData, "cus_oil_data");
          })
          break;
        default:


      }


      this.roleEntry = this.fb.group({
        roleName: ['', [<any>Validators.required]],
        roleEmail: ['', [<any>Validators.email, Validators.required]],
        roleChoosen: ['', [<any>Validators.required]]
      });
    }
  }

  addEntry() {
    this.cusStore = {
      "name": this.cusNickName,
      "role": "customer",
      "email": this.cusEmailId,
      "price": this.cusPrice,
      "product": this.cusOil,
      "quantity": this.cusQuantity,
      "purchased": this.purchasedDate,
      "dateCreated": this.dateNow,
      "entryBy": this.userEmail,
      "payment":this.cusPayment
    };
    console.log("saved", this.cusStore);

    this.db.collection("users").doc("all").collection("oil_data").add(this.cusStore);

    /*   this.db.collection("users").doc(this.cusEmailId).snapshotChanges();
       this.sfDocRef = this.db.collection("users").doc("eb.arun@gmail.com");
  
      this.db.firestore.runTransaction(transaction => {
      return transaction.get(this.db.collection("users").doc("eb.arun@gmail.com").ref).then(snapshot => {
      const largerArray = snapshot.get('array').push('newfield');
      transaction.update(this.sfDocRef.ref, 'array', largerArray);
    });
  });*/
    /*  {
          "name": "Arun",
          "role": "customer",
          "email": "eb.arun@gmail.com",
          "oil_history": {
            "price": 129,
            "product": "coconut",
            "quantity":1,
            "purchased": "Today"
          }
        }*/
  }

  addRole(data, valid) {
    this.submitted = true;
    if (valid === true) {
      this.roleStore = {
        "roleName": this.roleName,
        "roleEmail": this.roleEmail,
        "roleChoosen": this.roleChoosen,
        "dateCreated": this.dateNow,
        "createdBy": this.userEmail
      }
      this.db.collection("users").doc("all").collection("role").add(this.roleStore);
      console.log("added role", this.roleStore, data);
    }


  }
  addRequestRole() {
    alert("work in progress, stay tuned..");
  }


}
