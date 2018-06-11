import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import { Router }                from '@angular/router';
 
import { AuthenticationService } from './../../applicativeService/authentication/service';
import {Http, Response} from "@angular/http";
import {ActivatedRoute, Params} from '@angular/router';
import {FilterService}            from "../../applicativeService/filter/service";

 
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
        private http: Http) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.activatedRoute.queryParams.subscribe((params: Params) => {
          let token = params['token'];
          console.log("token", token)
          if (token) {
          console.log("send ?")
            this.http.get('/api/confirmEmail?token='+token)
              .map((response: Response) => {
          console.log("sent ?")
                let result = response.json();
                this.loading = false;
                if (result.success) {
                  this.router.navigate(['/']);
                } else {
                  this.error = "Une erreur est survenue, vérifié que vous avez bien ouvert le dernier email et qu'il ne date pas de plus de 14 jours."
                }
              });
          } else {
            this.loading = false;
            this.error = "Une erreur est survenue."
          }
        });

    }


}