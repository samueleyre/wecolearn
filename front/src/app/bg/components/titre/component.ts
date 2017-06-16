import { 
        Component, 
        OnInit,
        Injectable 
   }                             from '@angular/core';
import { NgForm }             from '@angular/forms';

import { Titre }                    from './entity';

import { GPPDService }             from './../../service/gppd';
import { GPPDComponent }             from './../../component/gppd';


import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class TitreComponent extends GPPDComponent implements OnInit {
    
    constructor( protected service: GPPDService, protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer ce titre, êtes vous sûr ?';
    }

    getApi() {
        return '/api/titres';
    }

    getEntity() {
        return new Titre();
    }

    
}