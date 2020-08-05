import {
        Component,
        OnInit,
   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '~/core/services/auth/auth';
import { ToastService } from '~/core/services/toast.service';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

export class ConfirmEmailComponent implements OnInit {
  public loading = true;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private _toastr: ToastService,
) { }

  ngOnInit() {
        // reset login status
    this.authenticationService.logout();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.http.get('/api/confirmEmail/' + token)
          .subscribe((result: any) => {
            this.loading = false;
            if (result.success) {
              this.router.navigate(['/']).then(() => {
                this._toastr.success('Votre email a bien été confirmé !');
              });
            } else {
              const message = 'Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email' +
                ' et qu\'il ne date pas de plus de 14 jours.';
              this.router.navigate(['/']).then(() => {
                this._toastr.error(message);
              });
            }
          });
      } else {
        this.loading = false;
        this._toastr.error('Une erreur est survenue.');
      }
    });
  }
}
