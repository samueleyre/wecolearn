
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
                // login successful if there's a jwt token in the response
                let token = response && response['token'];
                if ( token ) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.tokenService.set( token );
                    Logged.set(true);
                  // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }));
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

