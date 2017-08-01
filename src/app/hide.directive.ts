import { Directive,ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hideIt]'
})
export class HideDirective {

  constructor(private el:ElementRef) { }
  @Input('hideIt') hiddenStatus: boolean;  
  ngOnInit() {
    if(this.hiddenStatus)
    this.el.nativeElement.style.display = 'none';
    
  }



}
