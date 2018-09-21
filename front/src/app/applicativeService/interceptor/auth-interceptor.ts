import { Injectable      }        from "@angular/core";
import { Router }                 from '@angular/router';

import  { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor }                     from "@angular/common/http";
import { Observable }             from "rxjs/Rx";
import 'rxjs/add/operator/do'
import { catchError,tap} from 'rxjs/operators';



@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request).catch((error: HttpErrorResponse) => {
    //   console.log("AuthenticationInterceptor")
    //   if (error.status === 401) {
    //     console.log("new interceptor !!")
    //     // this.router.navigate([ '/' ]);
    //   }
    //   return Observable.throw(error);
    // }).do(event=> {
    // }, (error) => {
    //   if (error instanceof HttpErrorResponse && error.status === 401) {
    //     // this.router.navigate([ '/login' ]);
    //     console.log("test")
    //   }
    //   return error;
    // })
    return next.handle(request)
        .pipe(
            tap(event => {
              console.log("ttt")
              if (event instanceof HttpResponse) {

                console.log(" all looks good");
                // http response status code
                console.log(event.status);
              }
            }, error => {
              // http response status code
              console.log("----response----");
              console.error("status code:");
              console.error(error.status);
              console.error(error.message);
              console.log("--- end of response---");

            })
        )
  }
}