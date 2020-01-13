import {
  Component,
  OnInit,
  Injectable,
  Inject, Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { User } from '~/core/entities/user/entity';
import { environment } from '~/../environments/environment';
import { PATTERN } from '~/shared/config/pattern';
import { ProfileService } from '~/modules/profile/services/profile';


@Component({
  selector: 'user-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SettingsComponent implements OnInit {
  @Input() user: User;


  private newemail: string;
  private newpassword: string;
  public editing: object = {};
  public pattern: string;

  constructor(
      private profileService: ProfileService,
      private activatedRoute: ActivatedRoute,
      @Inject(APP_BASE_HREF) r: string,
      private router: Router,
      private _toastr: ToastrService,
  ) {
    this.initEditable();
  }

  ngOnInit() {
    this.pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
    this.newemail = this.user.email;
  }

  submitChangeEmail(f: NgForm) {
    this.callApi({ email: this.newemail });
    this.initEditable();
  }

  submitNewPassword(f: NgForm) {
    this.callApi({ password: this.newpassword });
    this.initEditable();
  }

  callApi(data: object) {
    const type = Object.keys(data)[0];

    this.profileService.changeParameter(data).subscribe(
      (response) => {
        if (response['duplicate']) {
          this._toastr.info('Cette adresse email est déjà utilisée.');
        } else if (response['noChange']) {
        } else if (response['changed']) {
          this._toastr.info('Le mot de passe a été modifié');
        } else if (response['error']) {
          this._toastr.error(response['error']);
        } else if (type === 'email') {
          this._toastr.info('Un email vous a été envoyé pour confirmer votre nouvel email');
          this.user = response['user'];
        } else {
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  initEditable(value: boolean = false) {
    this.editing = {
      newemail: value,
      newpassword: value,
    };
  }

  makeEditable(idName: string) {
    this.initEditable();
    this.editing[idName] = true;
  }

  deleteAccount(choice: boolean) {
    if (choice) {
      this.profileService.deleteAccount().subscribe((response) => {
        if (response['ok']) {
          this._toastr.info('Votre compte a bien été supprimé, ainsi que tout l\'historique de vos messages.');
          this.router.navigate(['/']);
        } else {
          this._toastr.error('Une erreur est survenue');
        }
      });
    }
  }
}
