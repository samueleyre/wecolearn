import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { ProfileService } from '~/core/services/user/profile.service';

import { TokenService } from './token';


@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _router: Router, private _tokenService: TokenService, private _http: HttpClient,
              private _profileService: ProfileService,
  ) {}

  public ping(): Observable<any> {
    return this._http.get('/api/ping').pipe(tap((user: User) => this._profileService.setProfile(user)));
  }
}

