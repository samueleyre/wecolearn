import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from './../token/service';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    
    constructor( private http: Http, private tokenService : TokenService ) {
        
    }
 
    login( email: string, password: string ): Observable<boolean> {
        return this.http.post('/api/login_check', { email: email, password: password })
            .map((response: Response ) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if ( token ) {
                    
                    
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.tokenService.set( token );
                    
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.tokenService.clear();
        
    }
}