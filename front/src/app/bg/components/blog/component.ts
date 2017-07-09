import { 
        Component, 
        OnInit,
        Injectable 
   }                             from '@angular/core';
import { NgForm }             from '@angular/forms';

import { Blog }                    from './entity';

import { GPPDService }             from './../../service/gppd';
import { GPPDComponent }             from './../../component/gppd';


import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class BlogComponent extends GPPDComponent implements OnInit {
    
    public idHebergeur: number;

    constructor( protected service: GPPDService, protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer ce blog, êtes vous sûr ?';
    }

    getApi() {
        return '/api/blogs';
    }

    getEntity() {
        return new Blog();
    }

    
}