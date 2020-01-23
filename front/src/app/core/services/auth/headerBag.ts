import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './token';

@Injectable({
  providedIn: 'root',
})
export class HeaderBag {
  static token: string = null;

  constructor(private tokenService: TokenService) {
  }

  static get(): any {
    return [
            { name: 'Authorization', value: 'Bearer ' + HeaderBag.token },
    ];
  }

  load(): Observable<void> {
    return this.tokenService.get().pipe(map((token: string) => {
      HeaderBag.token = token;
    }));
  }
}

