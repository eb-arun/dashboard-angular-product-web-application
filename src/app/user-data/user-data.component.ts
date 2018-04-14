import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  cusData: AngularFirestoreCollection<any>;
  cusDataRes: any;
  cusPayment: any;
  totalUnpaid:any;
  totalPaid:any;
  totalPurchased:any;
  totalUnpaidCash:any;
  totalPurchasedCash:any;
  totalPaidCash:any;

  updateInfo:any;
  updateShowInfo:any;
  getUpdateInfo:any;
  cusUpNickName:any;

  dateNow: Date;
  rowId: any;
  closeResult: any;

  roleName: any;
  roleEmail: any;
  roleChoosen: any;
  roleStore: any;
  roleEntry: FormGroup;
  submitted: any;
  role: any;
  allRoleRes:any;
  newUser: any;
existingUser: any;

  requestStore:any;
  requestOil:any;
  requestQuantity:any;
  allRequestRes:any;

  constructor(public authService: AuthService, private db: AngularFirestore, private router: Router, private fb: FormBuilder, private modalService: NgbModal) {
  }
  ngOnInit() {

    if (localStorage.getItem("userdata") === null) {
      this.router.navigate(['/logout']);
    } else {
      this.localUser = JSON.parse(localStorage.getItem("userdata"));
      this.role = localStorage.getItem('roleInfo');
      console.log('role = ', this.role);
      this.saveToStore = this.db.collection("users");
      this.userName = this.localUser.name;
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
          this.db.collection("users").doc("all").collection('role').valueChanges().subscribe(resData =>{
            this.allRoleRes = resData;
            console.log(resData, 'all_role');
          })
          this.db.collection("users").doc("all").collection('customer_request').valueChanges().subscribe(resData =>{
            this.allRequestRes = resData;
            console.log(resData, 'all_request');
          })
          break;
        case 'Customer':
          this.cusData = this.db.collection("users").doc("all").collection("oil_data", ref => ref.where('email', '==', this.userEmail));
          this.cusData.valueChanges().subscribe(resData => {
            this.cusDataRes = resData;
            this.totalPurchasedCash = 0;
            this.totalUnpaidCash = 0;
            this.totalPaidCash = 0;
            this.totalPurchased = resData.forEach(element => {
              this.totalPurchasedCash = this.totalPurchasedCash + parseInt(element.price);
              if(element.payment=='unpaid'){
                this.totalUnpaidCash = this.totalUnpaidCash + parseInt(element.price);
              }
              if(element.payment=='paid'){
                this.totalPaidCash = this.totalPaidCash + parseInt(element.price);
              }
            });
            if(this.cusDataRes.length > 0){
              
               this.newUser = false;
              this.existingUser = true;
            }
            else{
              this.newUser = true;
              this.existingUser = false;
            }
            // this.totalPaid = 
            // this.totalPurchased = 
            console.log(resData, "cus_oil_data", this.totalPurchasedCash, this.totalPaidCash, this.totalUnpaidCash);
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
    this.rowId = Date.now().toString();
    this.dateNow = new Date();
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
      "payment": this.cusPayment,
      "id": this.rowId
    };
    console.log("saved", this.cusStore);
    this.db.collection("users").doc("all").collection("oil_data").doc(this.rowId).set(this.cusStore);

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
  updateEntry(updateId, updateEntryModal) {
    this.updateShowInfo = this.db.collection("users").doc("all").collection("oil_data").doc(updateId).valueChanges().subscribe(res=>{
      this.getUpdateInfo = res;
      console.log(this.getUpdateInfo);
      this.cusUpNickName = this.getUpdateInfo.name;
      this.cusNickName = this.getUpdateInfo.name;
      this.cusOil=this.getUpdateInfo.product;
      this.cusEmailId = this.getUpdateInfo.email;
      this.cusPayment = this.getUpdateInfo.payment;
      this.cusPrice = this.getUpdateInfo.price;
      this.purchasedDate = this.getUpdateInfo.purchased;
      this.cusQuantity = this.getUpdateInfo.quantity;
      console.log(this.purchasedDate);
    })
    this.modalService.open(updateEntryModal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.dateNow = new Date();
      this.updateInfo = {
      "name": this.cusNickName,
      "role": "customer",
      "email": this.cusEmailId,
      "price": this.cusPrice,
      "product": this.cusOil,
      "quantity": this.cusQuantity,
      "purchased": this.purchasedDate,
      "dateModified": this.dateNow,
      "modifiedBy": this.userEmail,
      "payment": this.cusPayment,
    };
      this.db.collection("users").doc("all").collection("oil_data").doc(updateId).ref.set(this.updateInfo, {merge:true})
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
      console.log(this.closeResult, updateId);
    });

  }
  deleteEntry(deleteId, content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.db.collection("users").doc("all").collection("oil_data").doc(deleteId).delete().then(function () {
        console.log('Deleted', deleteId);
      }).catch(function (error) {
        alert("Error in deleting the data");
        console.log(error);
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });

  }
  addRole(data, valid) {
    this.submitted = true;
    if (valid === true) {
      this.rowId = Date.now().toString();
      this.dateNow = new Date();
      this.roleStore = {
        "roleName": this.roleName,
        "roleEmail": this.roleEmail,
        "roleChoosen": this.roleChoosen,
        "dateCreated": this.dateNow,
        "createdBy": this.userEmail,
        "id": this.rowId

      }
      this.db.collection("users").doc("all").collection("role").doc(this.rowId).set(this.roleStore);
      console.log("added role", this.roleStore, data);
    }


  }
  deleteRole(deleteId, deleteRoleAlert) {
    this.modalService.open(deleteRoleAlert).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.db.collection("users").doc("all").collection("role").doc(deleteId).delete().then(function () {
        console.log('Deleted Role', deleteId);
      }).catch(function (error) {
        alert("Error in deleting the data");
        console.log(error);
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }
  addRequest() {
    this.rowId = Date.now().toString();
    this.dateNow = new Date();
    this.requestStore = {
      'id':this.rowId,
      'oil':this.requestOil,
      'quantity':this.requestQuantity,
      'userName': this.userName,
      'userEmail':this.userEmail,
      'dateRequested':this.dateNow,
      'status':'pending'
    };
    this.db.collection("users").doc("all").collection("customer_request").doc(this.rowId).set(this.requestStore);
  }


}
