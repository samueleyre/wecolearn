import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NotificationService } from '~/shared/components/notification/service';
import { PushSubscriptionService } from '~/shared/components/push-subscription/service';
// import { SocketInit } from '~/shared/components/socket/init';

@Injectable()
export class MessagerieService {
  public constructor(
    private notificationService: NotificationService,
    private pushSubscriptionService: PushSubscriptionService ,
    // private socketInit: SocketInit
  ) {

  }

  public _type: BehaviorSubject<string> = new BehaviorSubject<string>('not set');
  public _available: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // initialise la messagerie.
    // demande la permission de recevoir des notification
    // si oui souscrit
    //      // si on ne peut pas souscrire : la promesse est rejetée
    // si non
    //      se connect au socket
    //      si on ne peut pas se connecter
    //            => la promesse est rejetée.
    // Ont doit verifier en permanence la connexion au socket pour eteindre le chat en cas de deconnexion.
    // dans tout les cas on se connecte au socket pour avoir l'info sur les utilisateurs connectés
  // public init(): Observable<boolean> {
    // return new Observable((subscriber) => {
    //   let subs;
    //   this.notificationService.requestPermission().then(
    //     () => {
    //       this.pushSubscriptionService.process()
    //       .then(
    //         () => {
    //           subscriber.next(true);
    //           this._type.next('push');
    //         },
    //         () => { // case subscription rejected
    //           subs = this.socketInit.handShake().subscribe(
    //             (data) => {
    //               subscriber.next(data);
    //               this._type.next('socket');
    //             },
    //             (error) => {
    //               subscriber.error(error);
    //             });
    //         });
    //     },
    //     () => {
    //       subs = this.socketInit.handShake().subscribe(
    //         (data) => {
    //           subscriber.next(data);
    //           this._type.next('socket');
    //         },
    //         (error) => {
    //           subscriber.error(error);
    //         });
    //     });
    //   return {
    //     unsubscribe: () => {
    //       subs.unsubscribe();
    //     },
    //   };
    // });
  // }

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
