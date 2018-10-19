
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import { TokenService } from './../token/service';


import {Logged} from './../authguard/logged';
import {Router} from "@angular/router";


@Injectable()
export class AuthenticationService {

  constructor( private http: HttpClient, private tokenService : TokenService, private router: Router,
  ) {

  }

  login( email: string, password: string ): Observable<boolean> {
      return this.http.post('/api/login_check', { email: email, password: password }).pipe(
          map((response: Response ) => {
              return this.loginResponse(response);
          }));
  }

  slackLogin( code: string, redirect_uri: string): Observable<any> {
    return this.http.get('/api/login_check/slack?code='+code+'&redirect_uri=' + redirect_uri).pipe(
        map((response: Response ) => {
          return (this.loginResponse(response)) ? response : false;
        }));
  }

  slackConnect( code: string, redirect_uri: string): Observable<any> {

    return this.http.get('/api/client/slack?code=' + code + '&redirect_uri=' + redirect_uri);

  }

  loginResponse(response: Response) {

    let token = response && response['token'];
    let error = response && response['error'];

    if (error) {
      return error;
    } else if (token) {
      this.tokenService.set( token );
      Logged.set(true);
      return true;
    } else {
      return false;
    }

  }

  sendEmailForPasswordReset(email: string) {

    return this.http.get('/api/resetPassword/email?email=' + email);

  }

  resetPassword(password: string, token: string) {

    return this.http.post('/api/resetPassword/password', {password: password, token: token});

  }

  checkPasswordToken(token: string) {

    return this.http.get('/api/resetPassword/token?token=' + token);

  }


  logout(returnHome = false) {
        // clear token remove user from local storage to log user out
        this.tokenService.clear();
        Logged.set(false);
        if( returnHome) {
          this.router.navigate(['/']);
        }
      return this;

    }
}
