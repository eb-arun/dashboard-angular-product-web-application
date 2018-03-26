import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
interface Post {
  title: string;
  content: string;
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
  hero;
  oilData: any;
  userData: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  constructor(public authService: AuthService, private db: AngularFirestore) { 
  }
  ngOnInit () {
      this.userData = this.db.collection("/users/");
      this.posts = this.userData.valueChanges();
      console.log(this.posts);
      this.userName = this.authService.currentUserDisplayName;
      this.userFirstName = this.authService.getFirstName(this.userName);
      this.profilePictrue = this.authService.currentUserDisplayPicture;
      console.log(this.userName);
}

 

}
