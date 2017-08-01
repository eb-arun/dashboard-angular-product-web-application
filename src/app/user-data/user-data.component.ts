import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../user-profile.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  providers: [UserProfileService]
})

export class UserDataComponent {

  hero;
  constructor(userProfileService:UserProfileService) { 
    this.hero = userProfileService.getUserData();
  }

 

}
