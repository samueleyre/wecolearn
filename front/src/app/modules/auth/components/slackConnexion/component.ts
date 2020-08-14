import {
  Component,
  OnInit,
  Injectable,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DomainService } from '~/core/services/domain/domain';
import { environment } from '~/../environments/environment';
import { TokenService } from '~/core/services/auth/token';
import { AuthenticationService } from '~/core/services/auth/auth';
import {EnvEnum} from "~/core/enums/env.enum";


@Component({
  selector: 'slack-connexion',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class SlackConnexionComponent implements OnInit {
  public subDomain: string = null;
  public redirectURI: string;
  public loading = false;
  public error: string = null;


  constructor(
      private domainService: DomainService,
      private tokenService: TokenService,
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    this.subDomain = this.domainService.getSubDomain();
    let subDomain = this.domainService.getSubDomain();
    if (subDomain === 'wecolearn') {
      subDomain = '';
    } else {
      subDomain += '.';
    }

    this.redirectURI = (environment.env === EnvEnum.PRODUCTION || environment.env === EnvEnum.STAGING) ?
        encodeURIComponent(`https://${subDomain}wecolearn.com/login`) : encodeURIComponent('http://0.0.0.0:8080/login');

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params && params['code']) {
        this.slackLogin(params['code'], this.redirectURI);
      }
    });
  }


  slackLogin(code: string, redirectUri: string) {
    this.loading = true;
    this.authenticationService.slackLogin(code, redirectUri).subscribe(
      (result) => {
        this.loading = false;
        if (result['subscribe']) {
          this.router.navigate(['/profilsettings']);
        } else {
          this.router.navigate(['/dashboard/search']);
        }
      },
      (error) => {
        this.error = 'Une erreur est survenue';
        this.loading = false;
      },
    );
  }
}
