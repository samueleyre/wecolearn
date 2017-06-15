import { Injectable }         from "@angular/core";
import { Router }             from '@angular/router';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, ResponseOptions, Http, Headers} from "@angular/http";
import { Observable }         from "rxjs/Rx";
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { environment }        from "./../config/environment";
import { TokenService }       from './../token/service';
import { PaginationService}    from './../pagination/service';

@Injectable()
export class InterceptedHttp extends Http {
    
    constructor( backend: ConnectionBackend,defaultOptions: RequestOptions,public tokenService : TokenService, public router : Router ) 
    {
        super(backend, defaultOptions);


    }

    preRequest(url: string | Request, options?:RequestOptionsArgs):BehaviorSubject<Response>  {
        
        var ret = new BehaviorSubject(new Response(new ResponseOptions ));

        super
        .request( url, options )
        .catch( ( error: Response ) => {
            if ( error.status === 401 || error.status === 403 ) { // unauthorized or forbidden //
                    this.tokenService.clear();
                    this.router.navigate(['/login']);
            }
            return BehaviorSubject.throw(error);
        
        }).subscribe( ( response:Response ) => {
                PaginationService.fromHeader( response.headers.get('X-Pagination') );
                ret.next( response );
        });

        return ret;
    } 

    request(url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
        
        return this.preRequest( url, options ).asObservable();
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.patch(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
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
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', 'Bearer ' + this.tokenService.get());
        
        options.headers.append('X-Pagination',PaginationService.toHeader());

        return options;
    }
}