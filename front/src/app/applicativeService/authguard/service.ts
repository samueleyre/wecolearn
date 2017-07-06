import { Injectable }       from '@angular/core';
import { Router, CanActivate }              from '@angular/router';
import { Http }                             from '@angular/http';
import { TokenService }        from './../token/service'

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private tokenService: TokenService, private http: Http ) { }
 
    canActivate() {
        return this.http.get('/api/ping').map( response => {
            console.log('canActivte');
            if( 401 === response.status  || 403 === response.status ) {
                this.router.navigate(['/login']);
                return false;        
            } else {
                return true;
            }
        })
    }
}