import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
 
import { AuthenticationService } from '../../applicativeService/authentication/service';
import {LoggerService} from "../../applicativeService/logger/service";
import { TokenService } from '../../applicativeService/token/service';
import {DomainService} from "../../service/domain";
import { environment } from '../../../environments/environment';

 
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
        let subDomain = this.domainService.getSubDomain();
        if (subDomain === "wecolearn") {
          subDomain = '';
        } else {
          subDomain += '.';
        }
        if (environment.production) {
          this.redirectURI = encodeURIComponent("https://"+subDomain+"wecolearn.com/login");
        } else {
          this.redirectURI = encodeURIComponent("http://0.0.0.0:8080/login");
        }

        this.activatedRoute.queryParams.subscribe((params: Params) => {
          if (params && params['code']) {
            this.slackLogin(params['code'], this.redirectURI)
          }
        });
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

    slackLogin(code:string, redirectUri:string) {
      this.loading = true;
      this.authenticationService.slackLogin(code, redirectUri).subscribe(
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