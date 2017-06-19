import { 
        Component, 
        Injectable 
   }                              from '@angular/core';
import { Http }                   from '@angular/http';

import { IEntity }                 from './../../entity/interface';
import { Clef }                    from './../clef/entity';



import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class BgUploadComponent  {
    
    public clefs: IEntity[];
    public disabled = false;
    
    constructor( private confirm: PopinConfirmService, private http: Http ) {
        
    } 
    
 
    onComplete(response : any ) {
        this.clefs = response;
    }


    post( neutre : IEntity , index : number, $event:any ) {
        
        let entity = new Clef();
        entity.set( neutre );
        this.disabled = true;

        this.http.post('/api/clefs', entity.serialize())
        
        .map(( response : any ) => {
            return response.json();            
        })
        .subscribe( ( neutre : IEntity ) => {
            console.log('ON SUBSC>RIBV');

            this.clefs.splice( index, 1 );
            $event.stopPropagation();
            this.disabled = false;
            
        });
    }

    delete( index : number ) {
        this
        .confirm
        .setMessage('Êtes vous sur de vouloir supprimer cette Phrase')
        .subscribe( (confirm : boolean) => {
            if( confirm ) {
                  this.clefs.splice( index, 1 );
            }
        });
    }
}