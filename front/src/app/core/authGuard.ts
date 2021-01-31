import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth';
import { Logged } from '~/core/services/auth/logged';
import { ToastService } from '~/core/services/toast.service';
import { ProfileService } from '~/core/services/user/profile.service';

import { PingService } from './services/auth/ping';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _pingService: PingService,
              private _profileService: ProfileService,
              private _toastr: ToastService) {
  }

  // todo: use different layouts for this
  private OPENROUTES = ['/subscribe', '/password/email', '/password/reset'];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._pingService.ping().pipe(
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

        if (state.url === '/') {
          this._router.navigate(['/dashboard/search']);
        }
        if ('admin' in route.data && !this._profileService.isAdmin) {
          this._router.navigate(['/']).then(() => {
            this._toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.');
          });
          return false;
        }
        return true;
      }));
  }
}

