import {
        Component,
        OnInit,
   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { ToastService } from '~/core/services/toast.service';
import { Logged } from '~/core/services/auth/logged';
import { NAV } from '~/config/navigation/nav';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

export class ConfirmEmailComponent implements OnInit {
  public loading = true;
  private redirect = NAV.dashHome;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private _toastr: ToastService,
) {
    Logged.get().subscribe((logged: boolean) => {
      if (!logged) {
        this.redirect = NAV.signin;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.http.get('/api/confirmEmail/' + token)
          .subscribe((result: any) => {
            this.loading = false;
            if (result.success) {
              this.router.navigate([this.redirect]).then(() => {
                this._toastr.success('Votre email a bien été confirmé !');
              });
            } else {
              const message = 'Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email' +
                ' et qu\'il ne date pas de plus de 14 jours.';
              this.router.navigate([this.redirect]).then(() => {
                this._toastr.error(message);
              });
            }
          });
      } else {
        this.loading = false;
        this.router.navigate([NAV.notFound]);
      }
    });
  }
}
