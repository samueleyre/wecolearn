import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, CanActivate } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Logged } from '~/core/services/auth/logged';
import { ToastService } from '~/core/services/toast.service';
import { ProfileService } from '~/core/services/user/profile.service';

import { PingService } from './services/auth/ping';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _router: Router,
              private _pingService: PingService,
              private _profileService: ProfileService,
              private _toastr: ToastService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowed('data' in route && 'admin' in route.data);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowed('admin' in route.data);
  }

  private isAllowed(isAdminRoute: boolean): Observable<boolean> {
    return this._pingService.ping().pipe(
      catchError((error: Response) => {
        let status = 500;
        if (error.status === 401 || error.status === 403) { // unauthorized or forbidden
          status = error.status;
        }
        return observableOf({ status });
      }),
      map((response: Response) => {
        if (401 === response.status || 403 === response.status) {
          this._router.navigate(['/signin']).then(() => {
            Logged.set(false);
          });
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
}

