import {Logged} from "../authguard/logged";
import {Observable} from "rxjs";
import {Injectable, NgZone} from "@angular/core";
import {TokenService} from "../token/service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoggerService} from "../logger/service";


@Injectable()
export class PingService {

  private zone: NgZone;


  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient, private loggerService: LoggerService
  ) { }

  public ping() {

    return this
        .http
        .get( '/api/ping' )
        .subscribe(
        (data) => {
          console.log(data)
          this.loggerService.log("Loggin set true")
          Logged.set(true);
        }, // success path
        error => {
          console.log(error)
          this.router.navigate(['/']);

        } // error path
        )
        // .catch( ( error: Response ) => {
        //   let status = 500;
        //   if ( error.status === 404 || error.status === 403 ) { // unauthorized or forbidden //
        //     status = error.status;
        //     let openRoutes = ["/login", "/search", "/"]; // todo: would probably be better in accessible config file
        //     // this.loggerService.log(this.router.url);
        //     if (openRoutes.indexOf(this.router.url) === -1) {
        //       this.loggerService.log("Pinged");
        //       this.router.navigate(['/']);
        //       // this.zone.run(() => this.router.navigate(['/']));
        //
        //     }
        //     // if( null !== redirectUrl) this.router.navigate([redirectUrl]);
        //     // let logged = false;
        //     // Logged.set(logged);
        //
        //   }
        //   return Observable.of({ status : status });
        // })
        // .map( response => {
        //   console.log("response", response)
        //   if( 404 === response['status']  || 403 === response['status']) {
        //     let openRoutes = ["/login", "/search", '/']; // todo: would probably be better in accessible config file
        //     if (openRoutes.indexOf(this.router.url) === -1) {
        //       this.loggerService.log("Pinged")
        //       this.router.navigate(['/']);
        //       // this.zone.run(() => this.router.navigate(['/']));
        //
        //       return true;
        //     }
        //     // if( null !== redirectUrl) this.router.navigate([redirectUrl]);
        //   } else {
        //     this.loggerService.log("Loggin set true")
        //     let logged = true;
        //     // Logged.set(logged);
        //     // return logged;
        //   }
        // });


  }

  public pingHome(): Observable<void> {

    return this
        .http
        .get( '/api/ping' )
        .map(response=>{
          if( 401 !== response['status']  &&  403 !== response['status']) {
            this.loggerService.log("Loggin set true")
            Logged.set(true);
            this.router.navigate(['/search']);
          } else {
            Logged.set(false);
          }

        })


  }


}


