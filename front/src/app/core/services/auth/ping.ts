import { of as observableOf, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ClientService } from '~/core/services/client';
import { AuthenticationService } from '~/core/services/auth/auth';
import { User } from '~/core/entities/user/entity';

import { Logged } from '../logged';
import { TokenService } from './token';


@Injectable()
export class PingService {
  // todo: use different layouts for this
  private OPENROUTES = ['/subscribe', '/password/email', '/password/reset'];


  constructor(private _router: Router, private _tokenService: TokenService, private _http: HttpClient,
              private authService: AuthenticationService,
  ) {
  }

  public ping(url: string): Observable<boolean> {
    return this
      ._http
      .get('/api/ping').pipe(
        catchError((error: Response) => {
          let status = 500;
          if (error.status === 401 || error.status === 403) { // unauthorized or forbidden //
            status = error.status;
          }
          return observableOf({ status });
        }),
        map((response: Response) => {
          if (401 === response.status || 403 === response.status) {
            if (this.OPENROUTES.indexOf(url) === -1) {
              this._router.navigate(['/signin']).then(() => {
                Logged.set(false);
              });
            }
            return true;
          }
          Logged.set(true);

          // set user profile
          const user = new User(response.body);
          this.authService.setUser(user);

          if (url === '/') {
            this._router.navigate(['/dashboard/search']);
          }
          return true;
        }));
  }
}

