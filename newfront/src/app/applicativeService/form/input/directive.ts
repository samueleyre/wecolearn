import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {


  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

  private focus(focus: boolean) {
    if (focus) {
      this.el.nativeElement.focus();
    }
  }







}