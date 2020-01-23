import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Threads } from '~/modules/chat/services/threads';
import { UrlService } from '~/core/services/url';

import { Permission } from './const';
import { NotificationInterface } from './interface';
import {NAV} from "~/config/navigation/nav";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public permission: Permission;

  constructor(
      private router: Router,
      private _threadsService: Threads,
  ) {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  public async requestPermission(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ('Notification' in window) {
        Notification.requestPermission().then((status) => {
          this.permission = status;
          if (status === 'granted') {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }

  public create(title: string, options ?: NotificationInterface): Observable<any> {
    const self = this;
    return new Observable((obs) => {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      if (self.permission !== 'granted') {
        console.log('The user hasn\'t granted you permission to send push notifications');
        obs.complete();
      }
      const _notify = new Notification(title, options);
      _notify.onshow = function (e) {
        return obs.next({
          notification: _notify,
          event: e,
        });
      };
      _notify.onclick = (e) => {
        console.log('clicked', e.srcElement);
        this.notificationAction(e.srcElement['data']);
        window.focus();
        _notify.close();
        return obs.next({
          notification: _notify,
          event: e,
        });
      };
      _notify.onerror = function (e) {
        return obs.error({
          notification: _notify,
          event: e,
        });
      };
      _notify.onclose = function () {
        return obs.complete();
      };
    });
  }

  public generateNotification(source: any[]): void {
    const self = this;
    source.forEach((item) => {
      const options = {
        body: item.alertContent,
        icon: UrlService.updateUrl('/logo/wecolearn.png'),
        data: { thread: item.thread },
      };
      const notify = self.create(item.title, options).subscribe();
    });
  }

  private notificationAction(data) {
    if (data['thread']) {
      this._threadsService.setCurrentThread(data['thread']);
      this.router.navigate([NAV.discussion]);
    }
  }
}

