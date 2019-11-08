import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NAV } from '~/config/navigation/nav';

import { TokenService } from './token';
import { Logged } from '../logged';


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private router: Router,
              private _toastr: ToastrService,
  ) {

  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('/api/login_check', { email, password }).pipe(
        map((response: Response) => this.loginResponse(response)));
  }

  slackLogin(code: string, redirectUri: string): Observable<any> {
    return this.http.get(`/api/login_check/slack?code=${code}&redirect_uri=${redirectUri}`).pipe(
        map((response: Response) => (this.loginResponse(response)) ? response : false));
  }

  /**
   * connects user account to his slack account
   */
  slackConnect(code: string, redirectUri: string): Observable<any> {
    return this.http.get(`/api/client/slack?code=${code}&redirect_uri=${redirectUri}`);
  }

  loginResponse(response: Response) {
    const token = response && response['token'];
    const error = response && response['error'];

    if (error) {
      return error;
    }
    if (token) {
      this.tokenService.set(token);
      Logged.set(true);
      return true;
    }
    return false;
  }

  sendEmailForPasswordReset(email: string) {
    return this.http.get(`/api/resetPassword/email?email=${email}`);
  }

  resetPassword(password: string, token: string) {
    return this.http.post(`/api/resetPassword/password`, { password, token });
  }

  checkPasswordToken(token: string) {
    return this.http.get(`/api/resetPassword/token?token=${token}`);
  }


  logout(returnHome = false) {
    // clear token remove user from local storage to log user out
    this.resetLogin();
    if (returnHome) {
      this.router.navigate([NAV.home]).then(() => {
        this._toastr.success('Vous avez bien été déconnecté.');
      });
    }
    return this;
  }

  resetLogin() {
    this.tokenService.clear();
    Logged.set(false);
  }
}
