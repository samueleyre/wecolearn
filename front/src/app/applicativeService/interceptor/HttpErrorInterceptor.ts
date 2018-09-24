
import {tap} from 'rxjs/operators';
import {
  HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpHeaders
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError as _throw} from "rxjs";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot}              from '@angular/router';

import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

import {Logged} from "../authguard/logged";
import {environment} from "../config/environment";
import {HeaderBag} from "./header-bag";
import {TokenService} from "../token/service";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private APIMETHODS = ["POST", "GET", "PATCH", "DELETE"];
  private OPENROUTES = ["/login", "/search", "/"];
  private api = environment.origin;


  constructor(private router: Router, public headerBag : HeaderBag, private tokenService : TokenService) {
  }

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler): Observable<HttpEvent<any>> {

    let update = {};
    if (this.APIMETHODS.indexOf(req.method) !== -1) {
      if (!(req.method === "GET" && req.url.substring(0,4) === 'http') ) {
        update['url'] = this.api + req.url;
        let httpHeaders = {};
        let headers = this.headerBag.get([]);
        for (let i in headers) {
          httpHeaders[headers[i].name] = headers[i].value;
        }
        update['headers']= new HttpHeaders(httpHeaders);
      }
    }

    let clonedRequest: HttpRequest<any> = req.clone(update);

    return next.handle(clonedRequest).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403 ) {
          this.tokenService.clear();
          Logged.set(false);

          if (this.OPENROUTES.indexOf(this.router.url) === -1) { // if doing request on not open pages
            // if (this.router.url !== '/') { // shouldn't be useful
              // this.router.navigate(['/']);  // -->> THIS IS NOT WORKING WHEN LOGIN OUT
            // }
          }
        }
        if (err.status === 404) {
          this.router.navigate(['/404']);
        }
      }
    }));
  }

}

