import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  constructor(private _network: Network) { }

  public isOnlineObservable(): Observable<boolean> {
    return merge(
      this._network.onDisconnect().pipe(map(() => false)),
      this._network.onConnect().pipe(map(() => true)),
    );
  }
}
