import { concatMap, tap } from 'rxjs/operators';
import {
  HttpResponse, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Logged } from '../logged';
import { HeaderBag } from './headerBag';
import { TokenService } from './token';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpApiInterceptor implements HttpInterceptor {
  private APIMETHODS = ['POST', 'GET', 'PATCH', 'DELETE'];
  private api = environment.origin;


  constructor(
    private router: Router,
    public headerBag: HeaderBag,
    private tokenService: TokenService,
    private _toastr: ToastrService,
  ) {
  }

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler): Observable<HttpEvent<any>> {
    const update = {};
    return this.headerBag.load().pipe(concatMap(() => {
      if (req.url.includes('assets/icons')) {
        return next.handle(req);
      }
      if (this.APIMETHODS.indexOf(req.method) !== -1 &&
        !(req.method === 'GET' && req.url.substring(0, 4) === 'http')) {
        update['url'] = `${this.api}${req.url}`;

        const httpHeaders = {};
        const headers = HeaderBag.get();

        for (const i in headers) {
          if (headers.hasOwnProperty(i)) {
            httpHeaders[headers[i].name] = headers[i].value;
          }
        }

        update['headers'] = new HttpHeaders(httpHeaders);
      }

      // cookie for notifications
      if (req.url.indexOf('ping') !== -1) {
        update['withCredentials'] = true;
      }

      const clonedRequest: HttpRequest<any> = req.clone(update);
      return next.handle(clonedRequest).pipe(tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.url.match(/api/)) {
              // Logged.set( true );
          }
        },
        (err: any) => {
          console.log('error', err , req);
          if (err instanceof HttpErrorResponse) {
            if (err.error['msg']) {
              this._toastr.error(err.error['msg']);
            }
            if (err.status === 401 || err.status === 403) {
              this.tokenService.clear();
              Logged.set(false);
            }
            if (err.status === 404) {
              this._toastr.error('Une erreur est survenue');
            }
          }
        }));
    }));
  }
}

