import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ClientService } from '~/core/services/user/client';
import { User } from '~/core/entities/user/entity';

import { TokenService } from './token';


@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _router: Router, private _tokenService: TokenService, private _http: HttpClient,
              private _clientService: ClientService,
  ) {}

  public ping(url: string): Observable<any> {
    return this._http.get('/api/ping').pipe(tap((user: User) => this._clientService.set(user)));
  }
}

