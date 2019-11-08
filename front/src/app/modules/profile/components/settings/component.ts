import {
  Component,
  OnInit,
  Injectable,
  Inject, Input,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { APP_BASE_HREF, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { User } from '~/shared/entities/user/entity';
import { ClientService } from '~/shared/services/client';
import { UserService } from '~/shared/services/user';
import { environment } from '~/../environments/environment';


@Component({
  selector: 'user-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SettingsComponent implements OnInit {
  @Input() user: User;


  private message: object;
  private newemail: string;
  private newpassword: string;
  public editing: object = {};
  public pattern: string;


  constructor(
      private clientService: ClientService,
      private activatedRoute: ActivatedRoute,
      @Inject(APP_BASE_HREF) r: string,
      private userService: UserService,
      private router: Router,
      private _toastr: ToastrService,
  ) {
    this.message = {
      email: null,
      password: null,
    };
    this.initEditable();
  }


  ngOnInit() {
    this.pattern = (environment.production) ?
      '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' : '[a-zA-Z0-9.+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
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

    this.clientService.changeParameter(data).subscribe(
      (response) => {
        if (response['duplicate']) {
          this._toastr.info('Cette adresse email est déjà utilisée.');
        } else if (response['noChange']) {
            // this._toastr.info("L'adresse email ")
        } else if (response['changed']) {
            // this.message['password'] = "Le mot de passe a été modifié";
          this._toastr.info('Le mot de passe a été modifié');
        } else if (response['error']) {
          this._toastr.error(response['error']);
        } else if (type === 'email') {
          this._toastr.info('Un email vous a été envoyé pour confirmer votre nouvel email');
          this.user = response['user'];
        } else {
            // this.message['password'] = "Un email vous a été envoyé pour confirmer votre nouveau mot de passe";
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
      this.clientService.deleteAccount().subscribe((response) => {
        // if ok go back to homz and show message
        // else error message
        if (response['ok']) {
          this._toastr.info('Votre compte a bien été supprimé, ainsi que tout l\'historique de vos messages.');
          this.router.navigate(['/']);
        } else {
          this._toastr.error('Une erreur est survenue');
        }
      });
    } else {
      //
    }
  }
}
