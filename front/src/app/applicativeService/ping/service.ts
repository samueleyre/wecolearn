import {Logged} from "../authguard/logged";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenService} from "../token/service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";


@Injectable()
export class PingService {

  constructor(private router: Router, private tokenService: TokenService, private http: Http ) { }

  public ping(redirectUrl:string = null) {

    return this
        .http
        .get( '/api/ping' )
        .catch( ( error: Response ) => {
          let status = 500;
          if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
            status = error.status;
            if( null !== redirectUrl) this.router.navigate([redirectUrl]);
            let logged = false;
            Logged.set(logged);

          }
          return Observable.of({ status : status });
        })
        .map( response => {
          if( 401 === response.status  || 403 === response.status ) {
            if( null !== redirectUrl) this.router.navigate([redirectUrl]);
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


