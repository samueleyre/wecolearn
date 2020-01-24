import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '~/../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PushSubscriptionService {
  constructor(private http: HttpClient) {

  }

  public async process(): Promise<any> {
    return new Promise((resolve , reject) => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then(
            (pushSub) => {
              if (pushSub) {
                console.log(pushSub)
                this.checkIfExistOrAddAndSubscribe(pushSub).subscribe(
                (data) => {
                  resolve('subscribed');
                },
                (error) => {
                  reject('error in subscribe api' + error);
                });
              } else {
                reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: this.urlB64ToUint8Array(environment.vapidPublic),
                }).then(
                (sub) => {
                  this.checkIfExistOrAddAndSubscribe(sub).subscribe(
                    (data) => {
                      resolve('subscribed');
                    },
                    (error) => {
                      reject('erro in subscribe api' + error);
                    });
                },
                (error) => {
                  if (Notification.permission === 'denied') {
                    reject('no permission');
                  } else {
                    reject('Unable to subscribe to push' + error);
                  }
                });
              }
            },
            () => {
              reject('nosubscription');
            });
        }); // no rejection possible.
      } else {
        reject('service worker unavailable');
      }
    });
  }


  private checkIfExistOrAddAndSubscribe(sub) {
    return this.http.post('/api/user/notification/check-if-exist-or-add-and-subscribe', sub);
  }

  private urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) { // tslint:disable-line
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
