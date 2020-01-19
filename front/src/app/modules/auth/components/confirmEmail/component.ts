import {
        Component,
        OnInit,
   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

export class ConfirmEmailComponent implements OnInit {
  public loading = true;
  public error = '';
  public info = '';
  private token = '';

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
) { }

  ngOnInit() {
        // reset login status
    this.authenticationService.logout();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.http.get('/api/confirmEmail/' + token)
              .pipe(
                map((response: Response) => response),
              )
                .subscribe((result: any) => {
                  this.loading = false;
                  if (result.success) {
                    this.info = 'Votre email a bien été confirmé !';
                    setTimeout(() =>
                              this.router.navigate(['/login']),
                               3000, // tslint:disable-line no-magic-numbers
                          );
                  } else if (result.error === 'confirmation_token_not_found') {
                    this.error = 'Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email' +
                      ' et qu\'il ne date pas de plus de 14 jours.';
                  } else if (result.error === 'confirmation_token_not_found') { // todo: specify this case
                    this.error = 'Votre compte a déjà été validé.';
                  } else {
                    this.error = 'Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email' +
                      ' et qu\'il ne date pas de plus de 14 jours.';
                  }
                });
      } else {
        this.loading = false;
        this.error = 'Une erreur est survenue.';
      }
    });
  }
}
