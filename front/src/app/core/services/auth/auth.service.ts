import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { NAV } from '~/config/navigation/nav';
import { User } from '~/core/entities/user/entity';
import { ToastService } from '~/core/services/toast.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { ThreadsService } from '~/core/services/chat/threads.service';

import { SessionService } from './session.service';
import { Logged } from './logged';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private tokenService: SessionService,
              private router: Router,
              private _toastr: ToastService,
              private _messageService: MessagesService,
              private _threadsService: ThreadsService,
  ) {}

  signUp(user: User, communityToken: string = null): Observable<any> {
    const communityURI = communityToken ? `/${communityToken}` : '';
    return this.http.post(`/api/signup${communityURI}`, user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('/api/login_check', { email, password }).pipe(
        map((response: Response) => this.loginResponse(response)));
  }

  slackLogin(code: string, redirectUri: string): Observable<any> {
    return this.http.get(`/api/login_check/slack?code=${code}&redirect_uri=${redirectUri}`).pipe(
        map((response: Response) => (this.loginResponse(response)) ? response : false));
  }
  //
  // /**
  //  * connects user account to his slack account
  //  */
  // slackConnect(code: string, redirectUri: string): Observable<any> {
  //   return this.http.get(`/api/client/slack?code=${code}&redirect_uri=${redirectUri}`);
  // }

  // todo: manage erros via api.service
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
      this.router.navigate([NAV.landing]).then(() => {
        // reset cache from services
        this._messageService.reset();
        this._threadsService.reset();
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
