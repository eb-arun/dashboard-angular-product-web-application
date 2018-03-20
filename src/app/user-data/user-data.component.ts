import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  hero;
  oilData: Observable<any[]>;
  constructor(public authService: AuthService, db: AngularFirestore) { 
      this.oilData = db.collection('users').valueChanges();
  }
  ngOnInit () {
      this.userName = this.authService.currentUserDisplayName;
      this.userFirstName = this.authService.getFirstName(this.userName);
      this.profilePictrue = this.authService.currentUserDisplayPicture;
      console.log(this.userName);
}

 

}
