import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Plugins, NotificationPermissionResponse,
} from '@capacitor/core';

import { ThreadsService } from '~/core/services/chat/threads.service';

import { Permission } from './const';
import { environment } from '../../../../environments/environment';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public mobileNativePermission: NotificationPermissionResponse;
  public navPermission: Permission;


  constructor(
      private router: Router,
      private _threadsService: ThreadsService,
  ) {
    this.navPermission = this.isSupported ? 'default' : 'denied';
  }

  public get isSupported(): boolean {
    return 'Notification' in window;
  }

  public async requestPermission(): Promise<void> {
    // console.log('request permission ########################################');
    return new Promise((resolve, reject) => {
      try {
        if (environment.android) {
          // push notifications on mobile
          PushNotifications.requestPermission().then(
            (status) => {
              console.log({ status });
              this.mobileNativePermission = status;
              if (status.granted) {
                PushNotifications.register();
                resolve();
              } else {
                reject();
              }
            },
            () => {
              console.log('rejected');
              reject();
            });
        } else {
          // push notifications on navigator
          if (this.isSupported) {
            Notification.requestPermission().then((status) => {
              this.navPermission = status;
              if (status === 'granted') {
                resolve();
              } else {
                reject();
              }
            });
          }
        }
      } catch (error) {
        console.log({ error });
        reject();
      }
    });
  }

  // public create(title: string, options ?: NotificationInterface): Observable<any> {
  //   const self = this;
  //   return new Observable((obs) => {
  //     if (!('Notification' in window)) {
  //       console.log('Notifications are not available in this environment');
  //       obs.complete();
  //     }
  //     if (self.permission !== 'granted') {
  //       console.log('The user hasn\'t granted you permission to send push notifications');
  //       obs.complete();
  //     }
  //     const _notify = new Notification(title, options);
  //     _notify.onshow = function (e) {
  //       return obs.next({
  //         notification: _notify,
  //         event: e,
  //       });
  //     };
  //     _notify.onclick = (e) => {
  //       console.log('clicked', e.srcElement);
  //       this.notificationAction(e.srcElement['data']);
  //       window.focus();
  //       _notify.close();
  //       return obs.next({
  //         notification: _notify,
  //         event: e,
  //       });
  //     };
  //     _notify.onerror = function (e) {
  //       return obs.error({
  //         notification: _notify,
  //         event: e,
  //       });
  //     };
  //     _notify.onclose = function () {
  //       return obs.complete();
  //     };
  //   });
  // }
  //
  // public generateNotification(source: any[]): void {
  //   const self = this;
  //   source.forEach((item) => {
  //     const options = {
  //       body: item.alertContent,
  //       icon: UrlService.updateUrl('/assets/logo/wecolearn.png'),
  //       data: { thread: item.thread },
  //     };
  //     const notify = self.create(item.title, options).subscribe();
  //   });
  // }
  //
  // private notificationAction(data) {
  //   if (data['thread']) {
  //     this._threadsService.setCurrentThread(data['thread']);
  //     this.router.navigate([NAV.discussion]);
  //   }
  // }
}

