import { Injectable  , NgZone    }        from "@angular/core";
import { Router }                 from '@angular/router';
import { ConnectionBackend,
    RequestOptions,
    Request,
    RequestOptionsArgs,
    Response,
    ResponseOptions,
    Http,
    // HttpRequest,
    Headers }                     from "@angular/http";
import  { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse }                     from "@angular/common/http";
import { Observable }             from "rxjs/Rx";
import 'rxjs/add/operator/do'
import { Subject }                from 'rxjs/Subject';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';
import { environment }            from "./../config/environment";
import { TokenService }           from './../token/service';
import { PaginationService}       from './../pagination/service';
import { HeaderBag }              from './header-bag';
import {Logged} from "../authguard/logged";
import {LoggerService} from "../logger/service";


@Injectable()
export class InterceptedHttp extends Http {

    private zone: NgZone;

    constructor( backend: ConnectionBackend,defaultOptions: RequestOptions,public tokenService : TokenService, public router : Router , private headerBag : HeaderBag, private loggerService: LoggerService )
    {
        super(backend, defaultOptions);

    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //   return next.handle(req).catch(
    //       (err: HttpErrorResponse) => {
    //         if (err.status === 401) {
    //           this.tokenService.clear();
    //           let openRoutes = ["/login", "/search", "/"]; // todo: would probably be better in accessible config file
    //           if (openRoutes.indexOf(this.router.url) === -1) {
    //             console.log("intercepted")
    //             this.router.navigate(['/']);
    //           }
    //         }
    //         return Observable.throw(err);
    //       }
    //   );
    // }


    request( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {

        return super
            .request( url, options )
            .catch( ( error: Response ) => {
                if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
                        this.tokenService.clear();
                        // console.log("current url", this.router.url)
                        let openRoutes = ["/login", "/search", "/"]; // todo: would probably be better in accessible config file
                        if (openRoutes.indexOf(this.router.url) === -1) {
                        // console.log("should redirect")
                        //   this.router.navigate(['/']);
                        //   this.zone.run(() => this.router.navigate(['/']));
                          // let logged = false;
                          // this.loggerService.log("Logge set false")
                          // Logged.set(logged);
                        }
                }
                if (error.status === 404) {
                    //this.tokenService.clear();
                    this.router.navigate(['/404']);
                }
                if( 500 <= error.status ) {
                    // console.log(error.json().message);
                    // console.log(error.json().trace );
                }
                if( 500 == error.status ) {
                    console.log(error.json().message);
                    console.log(error.json().trace );   
                }
                return Observable.throw(error);

            })
            .do((response: Response) => {
                PaginationService.fromHeader( response.headers.get('X-Pagination') );

            })
        ;
    }

    get( url: string, options?: RequestOptionsArgs): Observable<Response> {
        let apiRequest = false;
        if (url.substring(0,4) !== 'http' ) {
          url = this.updateUrl(url);
          apiRequest = true;
        }
        return super.get(url, this.getRequestOptionArgs(options, apiRequest));
    }

    post( url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put( url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    patch( url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.patch(url, body, this.getRequestOptionArgs(options));
    }

    delete( url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs, apiRequest: boolean = true) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (apiRequest) {
          let headers = this.headerBag.get([]);
          for( let i in headers ) {
            options.headers.append( headers[i].name, headers[i].value);
          }
        }

        return options;
    }
}
