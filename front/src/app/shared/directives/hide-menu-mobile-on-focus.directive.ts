import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FooterMobileService } from '~/core/services/layout/footer-mobile';

@Directive({
  selector: '[appHideMenuMobileOnFocus]',
})
export class HideMenuMobileOnFocusDirective {
  constructor(private el: ElementRef,
              private _deviceService: DeviceDetectorService,
              private _footerMobileService: FooterMobileService) {
  }

  @HostListener('focus')
  setInputFocus(): void {
    if (this._deviceService.isMobile()) {
      this._footerMobileService.inputFocusState.next(true);
    }
  }

  @HostListener('blur')
  setInputFocusOut(): void {
    if (this._deviceService.isMobile()) {
      this._footerMobileService.inputFocusState.next(false);
    }
  }
}
