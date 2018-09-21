import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {_throw} from "rxjs/observable/throw";
import {Router} from "@angular/router";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
        .catch(error => {
          if (error instanceof HttpErrorResponse && error.status == 404) {
            console.log("4000000004")
            return new EmptyObservable();
          } else if(error instanceof HttpErrorResponse && error.status == 401) {
            console.log("4000000001")
            return new EmptyObservable();
          }
          else
            return _throw(error);
        });
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};