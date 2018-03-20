import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  constructor(public authService: AuthService, db: AngularFirestore) { 
    this.items = db.collection('users').stateChanges();
    console.log(this.items, "arun");
}
ngOnInit () {
      this.userName = this.authService.currentUserDisplayName;
      this.userFirstName = this.authService.getFirstName(this.userName);
      this.profilePictrue = this.authService.currentUserDisplayPicture;
}



  

}
