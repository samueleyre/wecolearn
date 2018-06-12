import { 
        Component, 
        OnInit 
   }                             from '@angular/core';
import { Router }                from '@angular/router';
 
import { AuthenticationService } from './../../applicativeService/authentication/service';
 
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
        private authenticationService: AuthenticationService ) { }
 
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
                            this.router.navigate(['/settings']);
                        }
                    },
                    error => {
                        this.error = "L'email et/ou le mot de passe ne sont pas valide";
                        this.loading = false;
                    
                }
            );
    }

/*
    checkEmailFormat() {
        console.log("email", this.model.email)
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      if ((this.model.email.length <= 5 || !EMAIL_REGEXP.test(this.model.email))) {
          this.email = false;
      } else {
          this.email = false;
      }
    }
*/



}