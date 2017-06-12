import { 
        Component, 
        OnInit,
        Injectable 
   }                               from '@angular/core';
import { NgForm }                  from '@angular/forms';

import { Client }                  from './entity';

import { GPPDService }             from './../../service/gppd';
import { GPPDComponent }           from './../../component/gppd';


import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class ClientComponent extends GPPDComponent implements OnInit {
    
    constructor( protected service: GPPDService, protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer ce client, êtes vous sûr ?';
    }

    getApi() {
        return '/api/clients';
    }

    getEntity() {
        return new Client();
    }

    
}