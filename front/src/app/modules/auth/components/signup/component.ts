import {
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { User } from '~/shared/entities/user/entity';
import { UserService } from '~/shared/services/user';
import { AuthenticationService } from '~/shared/services/auth/auth';
import { DomainService } from '~/shared/services/domain';

import { environment } from '~/../environments/environment';


@Component({
  selector: 'form-signup',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class SignupComponent implements OnInit {
  user: User;
  users: User[];
  edition = false;
  loading = false;
  public barLabel = 'Difficulté du mot de passe : ';
  public error: string;
  public pattern: string;


  constructor(
      private router: Router,
      private userService: UserService,
      public modal: Modal,
      private authenticationService: AuthenticationService,
      private domainService: DomainService,
  ) {
    this.users = [];
    this.user = new User();
  }

  ngOnInit() {
    this.authenticationService.logout();
    let subDomain = this.domainService.getSubDomain();
    if (subDomain === 'wecolearn') {
      subDomain = '';
    } else {
      subDomain += '.';
    }
    this.pattern = (environment.production) ?
        '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' : '[a-zA-Z0-9.+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  }


  submit(f: NgForm) {
    this.userService.postNewUser(this.user).subscribe(
      (response) => {
        if (response === 'duplicate') {
          this.error = 'L\'adresse email est déjà utilisé.';
          setTimeout(
            () => {
              this.error = null;
            },
            5000); // tslint:disable-line no-magic-numbers
        } else {
          this.login();
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result) {
                // login successful
              this.router.navigate(['/dashboard/profile']);
            }
          },
          (error) => {
            this.loading = false;
          },
        );
  }
}
