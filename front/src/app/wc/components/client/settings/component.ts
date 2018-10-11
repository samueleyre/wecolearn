import {
    Component,
    OnInit,
    Injectable,
    Inject
}                             from '@angular/core';

import {Observable} from 'rxjs';

import { Http, Response }		from '@angular/http';


import { FormControl } from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../applicativeService/entity/interface';
import { Client }                from '../../../entities/client/entity';
import { Tag }                from '../../../entities/tag/entity';
import { User }                from '../../../../applicativeService/user/model';

import { GPPDService }            from '../../../service/gppd';
import { ClientService }            from '../../../service/client';
import { TagService }            from '../../../service/tag';
import { GPPDComponent }          from '../../../component/gppd';

import { MessageService }         from '../../../../applicativeService/message/service';
import {FilterService}            from "../../../../applicativeService/filter/service";
import {log} from "util";
import { APP_BASE_HREF, Location } from '@angular/common';
import {image} from "../../../../applicativeService/constants/image";
import {UserService} from "../../../../applicativeService/user/service";



@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SettingsComponent extends GPPDComponent implements OnInit {

  private message:object;
  private user: User;
  private newemail : string;
  private newpassword : string;
  private editing: object = {};
  private pattern: string;



  constructor( protected service: GPPDService, protected clientService : ClientService, private activatedRoute: ActivatedRoute,  protected http : Http, @Inject(APP_BASE_HREF) r:string, private userService : UserService,
  ) {
        super(service);
        this.clientService= clientService;
        this.user = new User();
        this.message = {
          email: null,
          password: null
        }
         this.initEditable();


  }


    ngOnInit() {
        this.load();
      if (process.env.NODE_ENV === 'production') {
        this.pattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
      } else {
        this.pattern = "[a-zA-Z0-9.+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
      }

    }

    load() : void {
        this.service.setApi(this.getApi());

        
        this.service.getOne().subscribe( ( User: User) => {
            //console.log("client", client);
            this.setEntity(User);
            //console.log("entity on loaded", client);
        });
    }

    setEntity(user: User) {
      this.user = user;
    }

  submitChangeEmail(f:NgForm) {

    this.callApi({email: this.newemail});
    this.initEditable();

  }

  verifyCurrentPassword() {






  }

  submitNewPassword(f:NgForm) {

    this.callApi({password: this.newpassword });
    this.initEditable();


  }

  callApi(data:object) {

    this.service.setApi(this.getApi());
    var type = Object.keys(data)[0];

    this.clientService.changeParameter(data).subscribe(
        response => {
          if (response["duplicate"]) {
            MessageService.info("Cette adresse email est déjà utilisée.")
          } else if (response["noChange"]) {
            // MessageService.info("L'adresse email ")
          } else if (response["changed"]) {
            // this.message['password'] = "Le mot de passe a été modifié";
            MessageService.info("Le mot de passe a été modifié")

          } else if (response['error'] ) {
            MessageService.error(response['error'])
          } else if (type === 'email') {
              MessageService.info("Un email vous a été envoyé pour confirmer votre nouvel email")
            this.setEntity(response['user']);
          } else {
            // this.message['password'] = "Un email vous a été envoyé pour confirmer votre nouveau mot de passe";
          }

      },
      error => { console.log(error)
      }
    );

    // this.user = new User();
    // f.resetForm();


  }


  getApi() {
      return '/api/user';
  }

  getEntity() {
     return new User();
  }

  initEditable(value: boolean = false) {

    this.editing= {
      newemail : value,
      newpassword: value,
    };

    // if (this.entity['first_name'] === '') this.editing['first_name'] = true; // the intention was to make editing mode apear when value in DB was null
    // if (this.entity['last_name'] === '') this.editing['last_name'] = true;

  }

  makeEditable(idName:string) {
    this.initEditable();
    this.editing[idName] = true;
  }



}