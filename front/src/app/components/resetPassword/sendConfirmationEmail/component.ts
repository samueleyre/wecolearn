import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
 
import { AuthenticationService } from './../../../applicativeService/authentication/service';
import {LoggerService} from "../../../applicativeService/logger/service";
import {Response} from "@angular/http";

 
@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})
 
export class SendPasswordConfirmationEmailComponent implements OnInit {
  private newEmail: string;
  private loading: boolean = false;
  private error: string;
  private success: string;


  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService,

    ) { }


    ngOnInit() {
      this.authenticationService.logout();
    }

    sendEmail() {
      this.loading = true;
      this.authenticationService.sendEmailForPasswordReset(this.newEmail)
          .subscribe(
              result => {
                this.loading = false;
                if ( result['error']) {
                  this.error = result['error'];
                } else {
                  this.success = "Un email vous a été envoyé pour réinitialiser votre mot de passe. ";
                  setTimeout(() => {
                    this.router.navigate(['/']);
                  }, 4000)
                }
              },
              error => {
                this.loading = false;
                this.error = "Une erreur est survenue.";
              }
          );
    }




}