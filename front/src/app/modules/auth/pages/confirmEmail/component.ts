import {
        Component,
        OnInit,
   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { ToastService } from '~/core/services/toast.service';
import { Logged } from '~/core/services/auth/logged';
import { NAV } from '~/config/navigation/nav';
import { PATTERN } from '~/shared/config/pattern';
import { EnvEnum } from '~/core/enums/env.enum';
import { User } from '~/core/entities/user/entity';

import { environment } from '../../../../../environments/environment';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

export class ConfirmEmailComponent implements OnInit {
  public loading = true;
  private redirect = NAV.dashHome;
  private emailPattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  private userId;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private _toastr: ToastService,
        private _fb: FormBuilder,
) {
    Logged.get().subscribe((logged: boolean) => {
      if (!logged) {
        this.redirect = NAV.signin;
      }
    });
  }

  public inviteFriendsForm = this._fb.group({
    email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
  });


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.http.get('/api/confirmEmail/' + token)
          .subscribe(
            (user: User) => {
              this.userId = user.id;
              this.loading = false;
              this._toastr.success('Votre email a bien été confirmé !');
            },
            () => {
              this.router.navigate([this.redirect]).then(() => {
                this._toastr.error('Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email' +
                                   ' et qu\'il ne date pas de plus de 14 jours.');
              });
            });
      } else {
        this.router.navigate([NAV.notFound]);
      }
    });
  }

  sendInvite() {
    const email = this.inviteFriendsForm.get('email').value;
    this.http.post('/api/inviteFriend', { email, userId: this.userId }).subscribe(
      () => {
        this.router.navigate([this.redirect]).then(() => {
          this._toastr.success('Merci d\'avoir contribué à la communauté !');
        });
      },
      () => {
        this._toastr.error('Une erreur est survenue.');
      });
  }
}
