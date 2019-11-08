import { of as observableOf, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Logged } from '../logged';
import { TokenService } from './token';


@Injectable()
export class PingService {
  private OPENROUTES = ['/subscribe', '/password/email', '/password/reset'];


  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient,
  ) {
  }

  public ping(url: string): Observable<boolean> {
    return this
        .http
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
                  this.router.navigate(['/signin']);
                }
                // this.logged.next( false );
                return true;
              }  {
                const logged = true;
                Logged.set(logged);
                if (url === '/') {
                  this.router.navigate(['/dashboard/search']);
                }
                return logged;
              }
            }));
  }
}

