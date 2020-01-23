import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NotificationService } from '~/shared/components/notification/service';
import { PushSubscriptionService } from '~/shared/components/push-subscription/service';

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  public constructor(
    private notificationService: NotificationService,
    private pushSubscriptionService: PushSubscriptionService,
  ) {

  }

  public _type: BehaviorSubject<string> = new BehaviorSubject<string>('not set');
  public _available: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public init(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.notificationService.requestPermission().then(
        () => {
          this.pushSubscriptionService.process()
          .then(
            () => {
              subscriber.next(true);
              this._type.next('push');
            });
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
