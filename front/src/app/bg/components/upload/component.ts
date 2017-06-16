import { 
        Component, 
        Injectable 
   }                              from '@angular/core';
import { Http }                   from '@angular/http';

import { IEntity }                 from './../../entity/interface';



import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class BgUploadComponent  {
    
    public neutres: IEntity[];
    
    constructor( private confirm: PopinConfirmService, private http: Http ) {
        
    } 
    
    post( neutre : IEntity , index : number ) {
        
        //let entity = new IEntity();
        //entity.set( neutre );

        let entity:any;

        this.http.post('/api/neutres', entity.serialize()).map(( response : any ) => {
            return response.json();            
        })
        .subscribe( ( neutre : IEntity ) => {
            this.neutres.splice( index, 1 );
            
        });
    }

    delete( index : number ) {
        this
        .confirm
        .setMessage('Êtes vous sur de vouloir supprimer cette Phrase')
        .subscribe( (confirm : boolean) => {
            if( confirm ) {
                  this.neutres.splice( index, 1 );
            }
        });
    }
}