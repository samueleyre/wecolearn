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
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Response} from "@angular/http";
import {Logged} from "../../../../applicativeService/authguard/logged";
import {DomainService} from "../../../service/domain";




@Component({
    templateUrl: 'template.html',
    styleUrls : ['./../../../../components/login/style.scss']

})


export class SubscribeComponent implements OnInit {

    user : User;
    users: User[];
    edition: boolean = false;
    loading = false;
    public barLabel: string = "Difficulté du mot de passe : ";
    private redirectURI: string;


    constructor(
        private router: Router,
        private userService : UserService,
        public modal: Modal,
        private authenticationService: AuthenticationService,
        private domainService: DomainService,

    ) {
        this.users = [];
        this.user = new User();
    }

    ngOnInit() {
        this.authenticationService.logout();
        let subDomain = this.domainService.getSubDomain();
        if (subDomain === "wecolearn") {
          subDomain = '';
        } else {
          subDomain += '.';
        }
      if (process.env.NODE_ENV === 'production') {
        this.redirectURI = encodeURIComponent("https://"+subDomain+"wecolearn.com/login");
      } else {
        this.redirectURI = encodeURIComponent("http://0.0.0.0:8080/login");
      }

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

    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.email, this.user.password) // is this useful ??
            .subscribe(
                result => {
                  this.loading = false;
                  if ( result === true )  {
                        // login successful
                        this.router.navigate(['/profilsettings']);
                    }
                },
                error => {
                    this.loading = false;
                }
            );
    }




}
