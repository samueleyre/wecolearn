import {
    Component,
    OnInit,
    OnChanges,
    ViewChild,
    Input
} from '@angular/core';
import { NgForm }                 from '@angular/forms';
import { Router }                 from '@angular/router';
import { UserService }            from './../../../../applicativeService/user/service';
import { User }            from './../../../../applicativeService/user/model';
import { Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';
import {AuthenticationService} from "../../../../applicativeService/authentication/service";
import { MessageService }          from './../../../../applicativeService/message/service';



 
@Component({
    templateUrl: 'template.html'
})


export class SubscribeComponent implements OnInit {
    
    user : User;
    users: User[];
    edition: boolean = false;
    loading = false;
    public barLabel: string = "Difficulté du mot de passe : ";


    constructor(
        private router: Router,
        private userService : UserService,
        public modal: Modal,
        private authenticationService: AuthenticationService,
    ) {
        this.users = [];
        this.user = new User();
    }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();


    }

   
    submit(f:NgForm) {

       this.userService.post(this.user).subscribe(
           response => {
               if (response === "duplicate") {
                   MessageService.info("Le nom d'utilisateur ou l'adresse email est déjà utilisé.")
               } else {
                   this.login();
               }
           },
           error => { console.log(error)

           }
       );
        // this.user = new User( null, '', '', '' );
        // f.resetForm();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.email, this.user.password)
            .subscribe(
                result => {
                    if ( result === true )  {
                        // login successful
                        // console.log(result);
                        this.loading = false;
                        this.router.navigate(['/settings']);
                    }
                },
                error => {
                    // console.log('ERROR', error );
                    this.loading = false;

                }
            );
    }


}