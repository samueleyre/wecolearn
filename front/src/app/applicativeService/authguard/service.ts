import { Injectable }                       from '@angular/core';
import { Router, CanActivate }              from '@angular/router';
import { Http }                             from '@angular/http';
import { TokenService }                     from './../token/service';
import { Logged }                           from './logged';
import { Observable }                       from "rxjs/Rx";
import { PingService }                             from  './../ping/service';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private tokenService: TokenService, private http: Http, private pingService: PingService ) { }

    canActivate() {
      return this.pingService.ping("/");
    }

}


@Injectable()
export class AuthGuardSearch implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService, private http: Http, private pingService: PingService ) { }

  canActivate() {
    return this.pingService.ping();
  }


}