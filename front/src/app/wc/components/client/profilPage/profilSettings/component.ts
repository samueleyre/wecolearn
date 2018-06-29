import {
    Component,
    OnInit,
    Injectable,
    Inject
}                             from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { Http, Response }		from '@angular/http';


import { FormControl } from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../../applicativeService/entity/interface';
import { Client }                from './../../../../entities/client/entity';
import { Tag }                from './../../../../entities/tag/entity';

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


  constructor( protected service: GPPDService, protected clientService : ClientService,  protected tagService : TagService,  private activatedRoute: ActivatedRoute,  protected http : Http, @Inject(APP_BASE_HREF) r:string, ) {
        super(service);
        this.base_url = r;
        this.tagService = tagService;
        this.clientService= clientService;

    }


    ngOnInit() {
        this.webPath = GPPDComponent.updateUrl('/');
        this.load();
    }

    load() : void {
        this.service.setApi(this.getApi());

        
        this.service.getOne().subscribe( ( client: IEntity) => {
            //console.log("client", client);
            this.setEntity(client);
            //console.log("entity on loaded", client);
            if (!this.entity['latitude']) {
                this.setDefaultLatLong();
            }
        });
    }

    setEntity(client: IEntity) {

        this.entity = this.setTags(client);

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

    submit(f:NgForm ) {
        this.joinTags();
        this.service.setApi(this.getApi());
        this.service.patchOne( this.entity ).subscribe(
            ( entitie: IEntity ) => {
                //console.log( 'entitie', entitie);
                this.entity = this.setTags(entitie);
                if (!this.entity['latitude']) {
                    this.setDefaultLatLong();
                }

                MessageService.info('Modification prise en compte !');
            },
            error => { console.log(error) }
        );
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
        this.modify = false;
        this.uploadError[id] = false;
    }

    onError(id:string, status:number)
    {
        console.log("error upload", status)
        this.uploadError[id] = "L'image est trop grande.";
    // if (response.status === 413) {
    // }

    }


    changePhoto(id : number) {
    // console.log(id)
    this.modify = true;
    // console.log(this.modify);
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