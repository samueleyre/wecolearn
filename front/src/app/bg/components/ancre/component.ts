import { 
        Component, 
        OnInit,
        Injectable 
   }                             from '@angular/core';
import { NgForm }             from '@angular/forms';

import { Ancre }                    from './entity';

import { GPPDService }             from './../../service/gppd';
import { GPPDComponent }             from './../../component/gppd';


import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class AncreComponent extends GPPDComponent implements OnInit {
    
    constructor( protected service: GPPDService, protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer cette phrase ancre, êtes vous sûr ?';
    }

    getApi() {
        return '/api/ancres';
    }

    getEntity() {
        return new Ancre();
    }

    
}