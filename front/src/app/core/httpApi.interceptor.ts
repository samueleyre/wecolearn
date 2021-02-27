import { concatMap, tap } from 'rxjs/operators';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { ToastService } from '~/core/services/toast.service';

import { Logged } from './services/auth/logged';
import { HeaderBag } from './services/auth/headerBag';
import { SessionService } from './services/auth/session.service';
import { environment } from '../../environments/environment';
import {NAV} from '~/config/navigation/nav';


@Injectable({
  providedIn: 'root',
})
export class HttpApiInterceptor implements HttpInterceptor {
  private APIMETHODS = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];
  private api = environment.origin;


  constructor(
    private _location: Location,
    private _headerBag: HeaderBag,
    private _tokenService: SessionService,
    private _toastr: ToastService,
  ) {
  }

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler): Observable<HttpEvent<any>> {
    const update = {};
    return this._headerBag.load().pipe(concatMap(() => {
      if (req.url.includes('assets/icons')) {
        return next.handle(req);
      }
      if (this.APIMETHODS.indexOf(req.method) !== -1 &&
        !(req.url.substring(0, 4) === 'http')) {
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
        (event: HttpEvent<any>) => {},
        (err: any) => {
          console.log('error', JSON.stringify(err) , JSON.stringify(req));
          if (err instanceof HttpErrorResponse) {
            if (err.error && err.error.msg) {
              this._toastr.error(err.error['msg']);
            }
            if (err.status === 401) {
              if (!['', NAV.signin, NAV.notFound].some(val => val === this._location.path())) {
                this._toastr.error("Vous n'êtes pas connecté.");
              }
              this._tokenService.clear();
              Logged.set(false);
            }
            if (err.status === 403) {
              this._toastr.error("Vous n'êtes pas autorisé.");
            }

            if (err.status === 404) {
              this._toastr.error('Cette ressource n\'est pas disponible');
            }
            if (err.status === 500) {
              this._toastr.error('Une erreur est survenue.');
            }
          }
          return err;
        }));
    }));
  }
}

