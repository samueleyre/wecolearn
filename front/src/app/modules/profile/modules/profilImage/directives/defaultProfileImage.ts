import { Directive, ElementRef, Input } from '@angular/core';

import { image } from '~/config/image';

@Directive({
  selector: '[defaultProfileImage]',
})
export class DefaultProfileImageDirective {
  private el: HTMLElement;
  private isApplied = false;
  private EVENT_TYPE = 'error';

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.el.addEventListener(this.EVENT_TYPE, this.onError.bind(this));
  }

  private onError() {
    this.removeEvents();

    if (!this.isApplied) {
      this.isApplied = true;
      this.el.setAttribute('src', image.default_200px);
    }
  }

  private removeEvents() {
    this.el.removeEventListener(this.EVENT_TYPE, this.onError);
  }

  ngOnDestroy() {
    this.removeEvents();
  }
}

