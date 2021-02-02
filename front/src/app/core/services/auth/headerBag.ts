import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderBag {
  static token: string = null;

  constructor(private tokenService: SessionService) {
  }

  static get(): any {
    return [
            { name: 'Authorization', value: 'Bearer ' + HeaderBag.token },
    ];
  }

  load(): Observable<void> {
    return this.tokenService.getAsObs().pipe(map((token: string) => {
      HeaderBag.token = token;
    }));
  }
}

