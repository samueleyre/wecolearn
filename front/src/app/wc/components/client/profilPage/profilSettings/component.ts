import {
    Component,
    OnInit,
    Injectable,
    Inject
}                             from '@angular/core';

import {Observable} from 'rxjs';

import { Http, Response }		from '@angular/http';
import { HttpClient }		from '@angular/common/http';


import { FormControl } from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../../applicativeService/entity/interface';
import { User} from '../../../../entities/user/entity';
import { Tag }                from './../../../../entities/tag/entity';
import { Image }                from './../../../../entities/image/entity';

import { GPPDService }            from './../../../../service/gppd';
import { ClientService }            from './../../../../service/client';
import { TagService }            from './../../../../service/tag';
import { GPPDComponent }          from './../../../../component/gppd';

import { MessageService }         from './../../../../../applicativeService/message/service';
import {FilterService}            from "../../../../../applicativeService/filter/service";
import {log} from "util";
import { APP_BASE_HREF, Location } from '@angular/common';
import {image} from "../../../../../applicativeService/constants/image";
import {DomainService} from "./../../../../service/domain";
import { AuthenticationService } from './../../../../../applicativeService/authentication/service';
import {SlackTeam} from "../../../../entities/slackTeam/entity";
import {SlackAccount} from "../../../../entities/slackAccount/entity";



@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class ProfilSettingsComponent implements OnInit {


    public  base_url : string;
    public zoom: number = 4;
    public client : User;
    private modify = false;
    private webPath : string;
    private uploadError : object = {};
    private baseImageName : string = image.default_200px;
    private tags:any = null;
    private tagTypes = ["learn_tags", "know_tags", "teach_tags"];
    private quillConfig : {
      "toolbar" : false
    }
    private editing: object = {};
    private loading = false;
    private ranges = [
      {
        value: 1,
        text: "1h"
      },
      {
        value: 2,
        text: "2h"
      },
      {
        value: 3,
        text: "3h"
      },
      {
        value: 4,
        text: "4h"
      },
      {
        value: 5,
        text: "5h"
      },
      {
        value: 6,
        text: "6h"
      },
      {
        value: 7,
        text: "7h"
      },
      {
        value: 8,
        text: "8h"
      },
      {
        value: 9,
        text: "9h"
      },
      {
        value: 10,
        text: "10h"
      },
      {
        value: 11,
        text: "+10h"
      },
    ];
    private atmospheres = [
      {
        value: 1,
        image: "coworking.jpg",
        text: "Coworking",
      },
      {
        value: 3,
        image: "office.jpeg",
        text: "Bureau"
      },
      {
        value: 2,
        image: "home.jpeg",
        text: "Maison"
      },
      {
        value: 4,
        image: "nature.jpg",
        text: "Nature",
      },
    ];
    private firstTime = false;
    private error = {
      "slack": ''
    };
    private redirectURI : string;
    private hasSlack: boolean;
    private hasRocketChat: boolean;
    private hasSlackAccount: boolean = false;
    private rocketChatId: string;



  constructor(
    protected service: GPPDService,
    protected clientService : ClientService,
    protected tagService : TagService,
    private activatedRoute: ActivatedRoute,
    protected http : HttpClient,
    @Inject(APP_BASE_HREF) r:string,
    private domainService: DomainService,
    private authenticationService: AuthenticationService
) {
        this.base_url = r;
        this.tagService = tagService;
        this.clientService= clientService;
        this.initEditable();


    }


    ngOnInit() {
        this.webPath = GPPDComponent.updateUrl('/');
        this.load();
    }

    load() : void {
      let subDomain = this.domainService.getSubDomain();
      this.hasSlack = this.domainService.hasSlack();
      this.hasRocketChat = this.domainService.hasRocketChat();
      if (subDomain === "wecolearn") {
        subDomain = '';
      } else {
        subDomain += '.';
      }
      if (process.env.NODE_ENV === 'production') {
        this.redirectURI = encodeURIComponent("https://" + subDomain + "wecolearn.com/profilsettings");
      } else {
        this.redirectURI = encodeURIComponent("http://0.0.0.0:8080/profilsettings");
      }

      this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params && params['code']) {
          this.slackConnect(params['code'], this.redirectURI)
        }
      });

      this.clientService.get().subscribe( ( client: User) => {
        console.log("client", client)
          this.setClient(client);
      });




    }

    setClient(client: User) {

        this.client = this.setTags(client);
        if (!this.client['latitude']) {
          this.setDefaultLatLong();
        }
        if (!this.client['image']) {
          this.client['image'] = new Image();
        }

        this.hasSlackAccount =  (null !== this.clientService.getSlackAccount(client, 'slack'));
        this.rocketChatId =  this.clientService.getSlackAccount(client, 'rocketchat');
        // console.log("rocketchatid", this.rocketChatId)

    }

    setTags(client: User) {
        client['learn_tags'] = [];
        client['know_tags'] = [];
        client['teach_tags'] = [];
        if (client['tags'].length > 0) {
            for(let i=0; i< client['tags'].length ; i++) {
                //console.log("types", client['tags'][i]['type'])
                switch (Number(client['tags'][i]['type'])) {
                    case 0:
                        client['learn_tags'].push(client['tags'][i]['name']);
                        break;
                    case 1:
                        client['know_tags'].push(client['tags'][i]['name']);
                        break;
                    case 2:
                        client['teach_tags'].push(client['tags'][i]['name']);
                        break;
                }
            }
        }
        return client;
    }

    slackConnect(code:string, redirect_uri:string) {
      this.loading = true;
      this.authenticationService.slackConnect(code, redirect_uri).subscribe(
         result => {
           this.loading = false;
           if (result['error']) {
             this.error.slack = result['error'];
           } else {
             this.setClient(result);
           }
         },
         error => {
           this.error.slack = "Une erreur est survenue";
           this.loading = false;

         }
      ) ;
    }

    submit() {
        this.initEditable();
        this.joinTags();
        this.clientService.patch( this.client ).subscribe(
            ( client: User ) => {
              this.setClient(client);
            },
            error => { console.log(error) }
        );
    }

    submitWithTimeOut() {

      setTimeout(()=> {
        this.submit();
        // console.log("show", this.client['show_profil'])
      }, 500);


    }

    joinTags() {
        this.client['tags'] = [];
        for(let i=0; i < this.tagTypes.length; i++) {
            if (this.client[this.tagTypes[i]].length > 0) {
                for(let j=0; j < this.client[this.tagTypes[i]].length; j++) {
                    let newValue = this.client[this.tagTypes[i]][j];
                    if (newValue.hasOwnProperty("value")) {
                        newValue = newValue["value"];
                    }
                    this.client['tags'].push(new Tag(null, newValue, i))
                }
            }
        }
        // console.log("jointags", this.client)
    }

    setDefaultLatLong() {
        this.client['latitude'] = 45.764043;
        this.client['longitude'] = 4.835659;
        this.zoom = 4;
    }


    getEntity() {
        let client = new User();
        client.learn_tags = null;
        client.teach_tags = null;
        client.know_tags = null;
        return client;
    }

    // images ----------

    onComplete(id:string, response:any )
    {
        this.client['image'] = response.response['image'];
        this.client['avatarSrc'] = response.response['avatarSrc'];
        this.uploadError[id] = false;
        this.submit();
    }

    onError(id:string, status:number)
    {
        console.log("error upload", status)
        this.uploadError[id] = "L'image est trop grande.";
    // if (response.status === 413) {
    // }

    }


    makeEditable(idName:string) {
      this.initEditable();
      this.editing[idName] = true;
    }

    initEditable(value: boolean = false) {

      this.editing= {
        firstName : value,
        lastName : value,
        learnTags : value,
        knowTags : value,
        teachTags : value,
        biographie: value,
        intensity: value,
        geolocation: value,
        rocketchatid: value
      };

      // if (this.client['first_name'] === '') this.editing['first_name'] = true; // the intention was to make editing mode apear when value in DB was null
      // if (this.client['last_name'] === '') this.editing['last_name'] = true;

    }


    public submitAfterBlur($event:any) {
      setTimeout(()=> {
        this.submit();
      }, 200)
    }

    private connectRocketChat() {

      let subDomain = this.domainService.getSubDomain();

      let found = false;
      for(let i = 0; i < this.client.slack_accounts.length; i++) {
        if( this.client.slack_accounts[i].slack_team.type === "rocketchat" && this.client.slack_accounts[i].slack_team.team_id === subDomain) {  // for rocketchat we use subodmain as an id for a rocketchat team
          this.client.slack_accounts[i].account_id = this.rocketChatId;
          found = true;
        }
      }
      if (false === found) {
        let newTeam = new SlackTeam(null, subDomain, subDomain, 'rocketchat');
        let newAccount = new SlackAccount(null, null, this.rocketChatId, newTeam);
        this.client.slack_accounts.push(newAccount);
      }


      this.submit();


    }




}
