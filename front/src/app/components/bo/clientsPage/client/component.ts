import {
    Component,
    OnInit,
    Inject,
    Injectable
} from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { Router } from '@angular/router';

import { User } from '../../../../entities/user/entity';
import { GPPDService } from '../../../../service/gppd';
import { GPPDComponent } from '../../../component/gppd';
import { APP_BASE_HREF} from '@angular/common';

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

@Injectable()
export class ClientComponent extends GPPDComponent implements OnInit {

    base_url: string;
    private modify: object = {};
    private imagePath: string;
    private right = false;
    router: Router;
    constructor(
        protected service: GPPDService,
        @Inject(APP_BASE_HREF) r: string,
        router: Router,
        private localStorage: LocalStorageService) {
          super(service );
          this.base_url = r;
          this.router = router;
        }

    onComplete(id: string, response: any ) {
        // console.log("uploaded", response)
        this.entities = response.response;
        this.modify[id] = false;
    }


    changePhoto(id: number) {
        // console.log(id)
        this.modify[id] = true;
        // console.log(this.modify);
    }

    ngOnInit() {
        this.imagePath = GPPDComponent.updateUrl('/img/');
        this.load();
    }

    getMessage() {
        return 'Etes vous sûr ?';
    }

    getApi() {
        return '/api/clients';
    }

    getEntity() {
        return new User();
    }






}