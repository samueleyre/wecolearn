import { Injectable }                       from '@angular/core';
import { Router, CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot}              from '@angular/router';
import { Http }                             from '@angular/http';
import { TokenService }                     from './../token/service';
import { Logged }                           from './logged';
import { Observable }                       from "rxjs/Rx";
import { PingService }                             from  './../ping/service';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private tokenService: TokenService, private http: Http, private pingService: PingService ) { }

    canActivate ( route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
      return this.pingService.ping(state.url);
    }

}

//
// @Injectable()
// export class AuthGuardSearch implements CanActivate {
//
//   constructor(private router: Router, private tokenService: TokenService, private http: Http, private pingService: PingService ) { }
//
//   canActivate() {
//     console.log("canactivatesearch")
//     return this.pingService.ping();
//   }
//
//
// }