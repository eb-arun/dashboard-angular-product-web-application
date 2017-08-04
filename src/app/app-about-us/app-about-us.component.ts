import { Component, OnInit } from '@angular/core';
import { BorderDirective } from '../border.directive';
import { Directive, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-app-about-us',
  templateUrl: './app-about-us.component.html',
  styleUrls: ['./app-about-us.component.css']
})
export class AppAboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cFun (value) {
    var value;
    if(value){
    console.log(value);
    }
    else {
    console.log("no data");
    }
  }

}
