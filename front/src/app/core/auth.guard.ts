import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, CanActivate } from '@angular/router';
import { BehaviorSubject, Observable, of as observableOf, timer } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

import { Logged } from '~/core/services/auth/logged';
import { ToastService } from '~/core/services/toast.service';
import { ProfileService } from '~/core/services/user/profile.service';
import { SessionService } from '~/core/services/auth/session.service';
import { NAV } from '~/config/navigation/nav';

import { PingService } from './services/auth/ping';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _router: Router,
              private _pingService: PingService,
              private _tokenService: SessionService,
              private _profileService: ProfileService,
              private _toastr: ToastService) {
  }
  private timer(response) {
    this._tempResponse$.next(response);
    setTimeout(() => {
      this._tempResponse$.next(null);
    },         500);
  }

  // temporary memory of response
  private _tempResponse$ = new BehaviorSubject(null);

  private get _tempResponse() {
    return this._tempResponse$.getValue();
  }

  private isAllowed(isAdminRoute: boolean): Observable<boolean> | boolean {
    // no token stored
    if (!this._tokenService.newToken && !this._tokenService.get()) {
      this._router.navigate([NAV.landing]).then(() => {
        Logged.set(false);
      });
      return false;
    }

    const obs = this._tempResponse ? this._tempResponse$ : this._pingService.ping().pipe(
      tap(response => this.timer(response)),
    );

    return obs.pipe(
      take(1), // for tempResponse$
      catchError((error: Response) => {
        let status = 500;
        if (error.status === 401 || error.status === 403) { // unauthorized or forbidden
          status = error.status;
        }
        return observableOf({ status });
      }),
      map((response: Response) => {
        if (401 === response.status) {
          this._router.navigate([NAV.landing]).then(() => {
            Logged.set(false);
          });
          return false;
        }
        if (403 === response.status) {
          this._router.navigate([NAV.search]);
          return false;
        }
        Logged.set(true);

        if (isAdminRoute && !this._profileService.isAdmin) {
          this._router.navigate(['/']).then(() => {
            this._toastr.error('Vous n\'êtes pas autorisé à accéder à cette page.');
          });
          return false;
        }
        return true;
      }));
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowed('data' in route && 'admin' in route.data);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowed('admin' in route.data);
  }
}

