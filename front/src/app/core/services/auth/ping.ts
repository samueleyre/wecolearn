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


@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _router: Router, private _tokenService: TokenService, private _http: HttpClient,
              private authService: AuthenticationService,
  ) {}

  public ping(url: string): Observable<any> {
    return this._http.get('/api/ping');
  }
}

