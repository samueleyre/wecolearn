import { Injectable      }        from "@angular/core";
import { Router }                 from '@angular/router';
import { ConnectionBackend,
    RequestOptions,
    Request,
    RequestOptionsArgs,
    Response,
    ResponseOptions,
    Http,
    Headers }                     from "@angular/http";
import { Observable }             from "rxjs/Rx";
import 'rxjs/add/operator/do'
import { Subject }                from 'rxjs/Subject';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';
import { environment }            from "./../config/environment";
import { TokenService }           from './../token/service';
import { PaginationService}       from './../pagination/service';
import { HeaderBag }              from './header-bag';

@Injectable()
export class InterceptedHttp extends Http {

    constructor( backend: ConnectionBackend,defaultOptions: RequestOptions,public tokenService : TokenService, public router : Router , private headerBag : HeaderBag )
    {
        super(backend, defaultOptions);

    }

    request( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {

        return super
            .request( url, options )
            .catch( ( error: Response ) => {
                if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
                        this.tokenService.clear();
                        let openRoutes = ["/login"]; // todo: would probably be better in accessible config file
                        if (openRoutes.indexOf(this.router.url) === -1) {
                            this.router.navigate(['/']);
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
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
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

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        let headers = this.headerBag.get([]);
        for( let i in headers ) {
                options.headers.append( headers[i].name, headers[i].value);

        }

        return options;
    }
}
