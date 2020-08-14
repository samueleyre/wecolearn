import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { from } from 'rxjs';

import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import {FooterMobileService} from "~/core/services/layout/footer-mobile";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private _toastrDesktop: ToastrService,
    private _toastMobile: ToastController,
    private _device: DeviceDetectorService,
    private _footerMobileService: FooterMobileService,
  ) { }

  error(message: string, title?: string, override?: any) {
    if (this._device.isMobile()) {
      this.presentMobileToast(message);
    } else {
      this._toastrDesktop.error(message, title, override);
    }
  }
  success(message: string, title?: string, override?: any) {
    if (this._device.isMobile()) {
      this.presentMobileToast(message);
    } else {
      this._toastrDesktop.success(message, title, override);
    }
  }
  info(message: string, title?: string, override?: any) {
    if (this._device.isMobile()) {
      this.presentMobileToast(message);
    } else {
      this._toastrDesktop.info(message, title, override);
    }
  }

  private presentMobileToast(message: string) {
    const toast$ = from(this._toastMobile.create({
      message,
      duration: 2000,
    }));

    toast$.subscribe((toast) => {
      toast.present();
    });
  }
}
