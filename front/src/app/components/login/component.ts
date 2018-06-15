import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import { Router }                from '@angular/router';
 
import { AuthenticationService } from './../../applicativeService/authentication/service';
import {LoggerService} from "../../applicativeService/logger/service";
 
@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private loggerService: LoggerService
    ) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {    
      this.loading = true;
      this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
                result => {
                  if ( result === true ) {
                      this.loading = false;
                    this.loggerService.log("login --> settings")
                    this.router.navigate(['/settings']);
                  }
              },
              error => {
                  this.error = "L'email et/ou le mot de passe ne sont pas valide";
                  this.loading = false;

            }
        );
    }




}