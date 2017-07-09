import { Injectable }                       from '@angular/core';
import { Router, CanActivate }              from '@angular/router';
import { Http }                             from '@angular/http';
import { TokenService }                     from './../token/service';
import { Logged }                           from './logged';
import { Observable }                       from "rxjs/Rx";


@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private tokenService: TokenService, private http: Http ) { }
 
    canActivate() {
        return this
        .http
        .get( '/api/ping' )
        .catch( ( error: Response ) => {
                let status = 500;
                if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
                    status = error.status
                    this.router.navigate(['/login']);
                    let logged = false;
                    Logged.set(logged);
                
                }
                return Observable.of({ status : status });
        })
        .map( response => {
            if( 401 === response.status  || 403 === response.status ) {
                this.router.navigate(['/login']);
                let logged = false;
                Logged.set(logged);
                return logged;        
            } else {    
                let logged = true;
                Logged.set(logged);
                return logged;
            }
        });
    }
}