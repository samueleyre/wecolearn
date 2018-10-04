import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
 
import { AuthenticationService } from './../../applicativeService/authentication/service';
import {LoggerService} from "../../applicativeService/logger/service";
import {Response} from "@angular/http";
import { TokenService } from './../../applicativeService/token/service';
import {DomainService} from "../../wc/service/domain";

 
@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    private redirectURI: string;


  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService,
        private tokenService : TokenService,
        private activatedRoute: ActivatedRoute,
        private domainService: DomainService,

    ) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          if (params && params['code']) {
            this.slackLogin(params['code'])
          }
        });
        let subDomain = this.domainService.getSubDomain();
        if (subDomain === "wecolearn") {
          subDomain = '';
        } else {
          subDomain += '.';
        }
        this.redirectURI = encodeURIComponent("https://"+subDomain+"wecolearn.com/login");
    }

    login() {
      this.loading = true;
      this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
                result => {
                  this.loading = false;
                  if ( result === true ) {
                    this.router.navigate(['/search']);
                  }
              },
              error => {
                  this.error = "L'email et/ou le mot de passe ne sont pas valide";
                  this.loading = false;
            }
        );
    }

    slackLogin(code:string) {
      this.loading = true;
      this.authenticationService.slackLogin(code).subscribe(
         result => {
           this.loading = false;
           if ( result['subscribe']) {
             this.router.navigate(['/profilsettings']);
           } else {
             this.router.navigate(['/search']);
           }

         },
         error => {
           this.error = "Une erreur est survenue";
           this.loading = false;

         }
      ) ;




    }




}