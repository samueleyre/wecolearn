import {
    Component,
    OnInit,
    Injectable
} from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm } from '@angular/forms';

import { IEntity } from '../../../../../applicativeService/entity/interface';
import { User } from '../../../../entities/user/entity';

import { GPPDService } from './../../../../service/gppd';
import { GPPDComponent } from './../../../../component/gppd';

import { MessageService } from './../../../../../../applicativeService/message/service';
import {FilterService} from '../../../../../applicativeService/filter/service';


@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class ProfilComponent extends GPPDComponent implements OnInit {



    constructor( protected service: GPPDService, private activatedRoute: ActivatedRoute ) {
        super(service);
    }

    ngOnInit() {

        this.load();
    }

    load(): void {
        this.service.setApi(this.getApi());
        this.service.get().subscribe( ( client: IEntity[] ) => {
            this.entity  = client[0];
        });

    }

    getApi() {
        return '/api/client/' + 1;
    }

    getEntity() {
        return new User();
    }


}