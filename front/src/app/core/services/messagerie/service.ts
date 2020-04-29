import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { NotificationService } from '~/shared/components/notification/service';
import { PushSubscriptionService } from '~/shared/components/push-subscription/service';

import { environment } from '../../../../environments/environment';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  public constructor(
    private _notificationService: NotificationService,
    private _pushSubscriptionService: PushSubscriptionService,
    private _platform: Platform,
  ) {

  }

  public _type: BehaviorSubject<string> = new BehaviorSubject<string>('not set');
  public _available: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public init(): Observable<boolean> {
    return new Observable((subscriber) => {
      if (environment.android) {
        console.log('should not show');
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
          console.log('####### registration #######: token = ' + token.value);
          this._pushSubscriptionService.checkIfExistOrAddAndSubscribeNotif({
            id: token.value,
            type: 'android',
          }).subscribe(() => {
            // tslint:disable-next-line:no-multi-spaces
          },           () => {

          });
        });


        PushNotifications.addListener('registrationError',
                                      (error: any) => {

                                      },
        );
      }

      this._notificationService.requestPermission().then(
        () => {
          this._pushSubscriptionService.process()
          .then(() => {
            subscriber.next(true);
            this._type.next('push');
            // tslint:disable-next-line:no-multi-spaces
          },    (error) => {
            console.log(error);
          });
        },
        (error) => {
          console.log(error);
        });
    });
  }

  public available() {
    return this._available.asObservable();
  }

  public setStatus(available: boolean) {
    this._available.next(available);
  }

  public type() {
    return this._type.asObservable();
  }
}
