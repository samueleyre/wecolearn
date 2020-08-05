import {
  Component,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastController } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})export class SearchComponent {
  constructor(
    private deviceService: DeviceDetectorService,
    private _toastMobile: ToastController,
  ) {
    // const toast$ = from(this._toastMobile.create({
    //   message: 'message',
    //   duration: 20000,
    // }));
    // toast$.subscribe((toast) => {
    //   toast.present();
    // });
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}

