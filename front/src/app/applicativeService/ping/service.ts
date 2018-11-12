
import {of as observableOf, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Logged} from "../authguard/logged";
import {Injectable} from "@angular/core";
import {TokenService} from "../token/service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoggerService} from "../logger/service";


@Injectable()
export class PingService {

  private OPENROUTES = ["/login", "/search", "/"];



  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient, private loggerService: LoggerService
  ) { }

  public ping(url: string) : Observable<boolean>{


    return this
        .http
        .get( '/api/ping' ).pipe(
        catchError( ( error: Response ) => {
          let status = 500;
          if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
            status = error.status;
          }
          return observableOf({ status : status });
        }),
        map( response => {
          // console.log(response)
          if( 401 === response['status']  || 403 === response['status']) {
            // this.loggerService.log("Ping", "url "+url, "router.url "+this.router.url)
            if (this.OPENROUTES.indexOf(url) === -1) {
                this.router.navigate(['/']);
            }
            return true;
          } else {
            if (url === '/') {
              this.router.navigate(['/search']);
            }
            let logged = true;
            Logged.set(logged);
            return logged;
          }
        }));


  }



}


