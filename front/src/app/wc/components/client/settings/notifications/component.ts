import {
  Component,
  OnInit,
  Injectable,
}                             from '@angular/core';



import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../../applicativeService/entity/interface';
import { Client }                from './../../../../entities/client/entity';

import { GPPDService }            from './../../../../service/gppd';
import { GPPDComponent }          from './../../../../component/gppd';

import { MessageService }         from './../../../../../applicativeService/message/service';


@Component({
  selector : 'emailNotificationSettings',
  templateUrl: 'template.html',
  styleUrls : ['style.scss']
})

@Injectable()
export class EmailNotificationSettingsComponent extends GPPDComponent implements OnInit {



  constructor( protected service: GPPDService) {
    super(service);
    this.entity = new Client();

  }



  ngOnInit() {
    this.load();
  }

  load() : void {
    this.service.setApi(this.getApi());
    this.service.getOne().subscribe( ( client: IEntity) => {
      // console.log("notification received ", client['email_notifications'])

      this.setEntity(client);
    });
  }

  setEntity(client: IEntity) {

    this.entity = client;
  }


  submitNotification() {

    // console.log("notification change ", this.entity['email_notifications'])
    setTimeout(()=> {
     // console.log("notification change ", this.entity['email_notifications'])
     //  this.entity['email_notifications'] = 0;
      // this.entity['email_notifications'] = false;
      this.service.patchOne( this.entity ).subscribe(
        ( entity: IEntity ) => {
          MessageService.info('Modification prise en compte !');
        },
        error => { console.log(error) }
      );
    }, 0);


  }


  getApi() {
    return '/api/client';
  }




}