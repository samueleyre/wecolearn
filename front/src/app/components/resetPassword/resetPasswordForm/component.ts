import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
 
import { AuthenticationService } from './../../../applicativeService/authentication/service';
import {LoggerService} from "../../../applicativeService/logger/service";
import {MessageService} from "../../../applicativeService/message/service";

 
@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})
 
export class ResetPasswordFormComponent implements OnInit {

  private newPassword: string;
  private loading: boolean = false;
  private error: string;
  private success: string;
  private token : string;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService,
        private activatedRoute: ActivatedRoute,

  ) { }
 
    ngOnInit() {
        this.authenticationService.logout();
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          if (params && params['token']) {
            this.authenticationService.checkPasswordToken(params['token']).subscribe(
                result=>{
                  if (result['error']) {
                    this.router.navigate(['/login']);
                    //todo: send message error
                    MessageService.error("Une erreur est survenue lors de la réinitalisation de votre mot de passe, vérifier que vous avez bien ouvert le dernier email intitulé \"Nouveau mot de passe \". ");
                  } else {
                    this.token = params['token'];

                  }
                },
                error=>{
                  this.router.navigate(['/login']);
                }
            )
          }
        });
    }

  changePassword() {
      this.loading = true;
      if (this.token) {
        this.authenticationService.resetPassword(this.newPassword, this.token)
            .subscribe(
                result => {
                  this.loading = false;
                  if ( result['error']) {
                    this.error = result['error'];
                  } else {
                    this.success = "Votre mot de passe a été modifié avec succès !";
                    setTimeout(() => {
                      this.router.navigate(['/search']);
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


}