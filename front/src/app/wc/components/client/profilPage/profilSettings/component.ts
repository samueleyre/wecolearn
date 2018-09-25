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
import { Client }                from './../../../../entities/client/entity';
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



@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class ProfilSettingsComponent extends GPPDComponent implements OnInit {


    public  base_url : string;
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


  constructor( protected service: GPPDService, protected clientService : ClientService,  protected tagService : TagService,  private activatedRoute: ActivatedRoute,  protected http : HttpClient, @Inject(APP_BASE_HREF) r:string, ) {
        super(service);
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
        this.service.setApi(this.getApi());

        
        this.service.getOne().subscribe( ( client: IEntity) => {
            this.setEntity(client);
        });
    }

    setEntity(client: IEntity) {

        this.entity = this.setTags(client);
        if (!this.entity['latitude']) {
          this.setDefaultLatLong();
        }
        if (!this.entity['image']) {
          this.entity['image'] = new Image();
        }

    }

    setTags(client: IEntity) {
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

    submit() {
        this.initEditable();
        this.joinTags();
        this.service.setApi(this.getApi());
        this.service.patchOne( this.entity ).subscribe(
            ( client: IEntity ) => {
              this.setEntity(client);
            },
            error => { console.log(error) }
        );
    }

    submitWithTimeOut() {

      setTimeout(()=> {
        this.submit();
        // console.log("show", this.entity['show_profil'])
      }, 500);


      }

    joinTags() {
        this.entity['tags'] = [];
        for(let i=0; i < this.tagTypes.length; i++) {
            if (this.entity[this.tagTypes[i]].length > 0) {
                for(let j=0; j < this.entity[this.tagTypes[i]].length; j++) {
                    let newValue = this.entity[this.tagTypes[i]][j];
                    if (newValue.hasOwnProperty("value")) {
                        newValue = newValue["value"];
                    }
                    this.entity['tags'].push(new Tag(null, newValue, i))
                }
            }
        }
        // console.log("jointags", this.entity)
    }

    setDefaultLatLong() {
        this.entity['latitude'] = 45.764043;
        this.entity['longitude'] = 4.835659;
    }



    getApi() {
        return '/api/client';
    }

    getEntity() {
        let client = new Client();
        client.learn_tags = null;
        client.teach_tags = null;
        client.know_tags = null;
        return client;
    }

    // images ----------

    onComplete(id:string, response:any )
    {
        this.entity['image'] = response.response['image'];
        this.entity['avatarSrc'] = response.response['avatarSrc'];
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
      };

      // if (this.entity['first_name'] === '') this.editing['first_name'] = true; // the intention was to make editing mode apear when value in DB was null
      // if (this.entity['last_name'] === '') this.editing['last_name'] = true;

    }

    // tags ------------

    private notAlphaNumeric(control: FormControl) {

        let regex = /^[a-z0-9]+$/i;
        if (regex.exec(control.value) === null) {
            return {
                'notAlphaNumeric': true
            };
        }

        return null;
    }


    public validators = [this.notAlphaNumeric];

    public errorMessages = {
        'notAlphaNumeric': 'Le tag doit être alphanumerique.',
    };

    public requestAutocompleteItems = (text: string): Observable<Array<String>> => {
        return this.tagService.findTags(text);
    };




}