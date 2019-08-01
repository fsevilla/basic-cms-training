import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputStatus]'
})
export class InputStatusDirective implements OnChanges {
  @Input() appInputStatus:string;

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnChanges() {
    if(this.appInputStatus === 'error') {
      console.log('Status of input', this.appInputStatus);
      this.el.nativeElement.classList.add('error');
    } else {
      this.el.nativeElement.classList.remove('error');
    }

  }

}
