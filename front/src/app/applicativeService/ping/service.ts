import {Logged} from "../authguard/logged";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenService} from "../token/service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {LoggerService} from "../logger/service";


@Injectable()
export class PingService {

  constructor(private router: Router, private tokenService: TokenService, private http: Http, private loggerService: LoggerService
  ) { }

  public ping() {

    return this
        .http
        .get( '/api/ping' )
        .catch( ( error: Response ) => {
          let status = 500;
          if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
            status = error.status;
            let openRoutes = ["/login", "/search", "/"]; // todo: would probably be better in accessible config file
            this.loggerService.log(this.router.url);
            if (openRoutes.indexOf(this.router.url) === -1) {
              this.loggerService.log("Pinged");
              this.router.navigate(['/']);
            }
            // if( null !== redirectUrl) this.router.navigate([redirectUrl]);
            let logged = false;
            Logged.set(logged);

          }
          return Observable.of({ status : status });
        })
        .map( response => {
          if( 401 === response.status  || 403 === response.status ) {
            let logged = false;
            Logged.set(logged);
            let openRoutes = ["/login", "/search", '/']; // todo: would probably be better in accessible config file
            if (openRoutes.indexOf(this.router.url) === -1) {
              this.loggerService.log("Pinged")
              this.router.navigate(['/']);
              return logged;
            } else {
              return true;
            }
            // if( null !== redirectUrl) this.router.navigate([redirectUrl]);
          } else {
            let logged = true;
            Logged.set(logged);
            return logged;
          }
        });


  }

}


