import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import { Router }                from '@angular/router';
 
import { AuthenticationService } from './../../applicativeService/authentication/service';
import {Http, Response} from "@angular/http";
import {ActivatedRoute, Params} from '@angular/router';
import {FilterService}            from "../../applicativeService/filter/service";
import {LoggerService} from "../../applicativeService/logger/service";

 
@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})
 
export class ConfirmEmailComponent implements OnInit {

    private loading = true;
    private error = '';
    private info = '';
    private token: string = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private http: Http,
        private loggerService: LoggerService
) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.activatedRoute.queryParams.subscribe((params: Params) => {
          let token = params['token'];
          if (token) {
            this.http.get('/api/confirmEmail/'+token)
              .map((response: Response) => response.json())
                .subscribe((result : any) => {
                      this.loading = false;
                      if (result.success) {
                          this.info = "Votre email a bien été confirmé !";
                          setTimeout(()=>
                              this.router.navigate(['/login']),
                              3000
                          )
                      } else if (result.error = "confirmation_token_not_found") {
                          this.error = "Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email et qu'il ne date pas de plus de 14 jours."
                      } else if (result.error = "confirmation_token_not_found") {
                          this.error = "Votre compte a déjà été validé."
                      } else {
                          this.error = "Une erreur est survenue, vérifiez que vous avez bien ouvert le dernier email et qu'il ne date pas de plus de 14 jours."
                      }
                });
          } else {
            this.loading = false;
            this.error = "Une erreur est survenue."
          }
        });

    }


}