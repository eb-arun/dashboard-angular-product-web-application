import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

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
  constructor(public authService: AuthService) { 
}
ngOnInit () {
      this.userName = this.authService.currentUserDisplayName;
      this.userFirstName = this.authService.getFirstName(this.userName);
      this.profilePictrue = this.authService.currentUserDisplayPicture;
      setTimeout(()=>this.userName=this.authService.currentUserDisplayName, 600); 
}


  

}
