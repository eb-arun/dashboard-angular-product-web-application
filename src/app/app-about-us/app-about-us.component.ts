import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-about-us',
  templateUrl: './app-about-us.component.html',
  styleUrls: ['./app-about-us.component.css']
})
export class AppAboutUsComponent {

  constructor() { }

  textData;
  cFun (textData:string) {
    
    if(textData){
    this.textData = textData;
    }
    else {
      this.textData = 'no data';
    }
  }

  getVal() {
    
  }

}
