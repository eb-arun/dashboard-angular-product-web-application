import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[myBorder]'
})
export class BorderDirective {
  @Input('myBorder') myBorderColor:string;
  constructor(private el:ElementRef) {
    //el.nativeElement.style.border = '1px solid red';
     }
  ngOnInit(){
    this.el.nativeElement.style.border = '1px solid '+(this.myBorderColor || 'red');
}

}
