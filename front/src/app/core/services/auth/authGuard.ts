import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth';
import { Logged } from '~/core/services/logged';

import { PingService } from './ping';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _pingService: PingService,
              private _authService: AuthenticationService,
              private _toastr: ToastrService) {
  }

  // todo: use different layouts for this
  private OPENROUTES = ['/subscribe', '/password/email', '/password/reset'];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._pingService.ping(state.url).pipe(
      catchError((error: Response) => {
        let status = 500;
        if (error.status === 401 || error.status === 403) { // unauthorized or forbidden //
          status = error.status;
        }
        return observableOf({ status });
      }),
      map((response: Response) => {
        if (401 === response.status || 403 === response.status) {
          if (this.OPENROUTES.indexOf(state.url) === -1) {
            this._router.navigate(['/signin']).then(() => {
              Logged.set(false);
            });
          }
          return false;
        }
        Logged.set(true);

        // set user profile
        const user = <any>response; // User entity needs more work
        this._authService.setUser(user);

        if (state.url === '/') {
          this._router.navigate(['/dashboard/search']);
        }
        if ('admin' in route.data && !this._authService.isAdmin) {
          this._router.navigate(['/']).then(() => {
            this._toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.');
          });
          return false;
        }
        return true;
      }));
  }
}

