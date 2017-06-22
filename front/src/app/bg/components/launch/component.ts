import { 
        Component, 
        OnInit,
        Injectable 
   }                                  from '@angular/core';
import { NgForm }                     from '@angular/forms';
import { Http }                       from '@angular/http';

import { Masse }                      from './model';
import { GPPDService }                from './../../service/gppd';
import { GPPDComponent }              from './../../component/gppd';
import { PopinConfirmService }        from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class LaunchComponent implements OnInit {
    
    public masses:Masse[] = [];
    public remaining:number = 0;
    public remainingLaunched:number = 0;
    
    constructor(protected http:Http ) {

    }

    ngOnInit() {
        this.load();
    }

    private load() {
        this.http.get('/api/masses?unused=1')
        .map((response) => {
            return response.json();
        })
        .subscribe((masses:Masse[])=> {
            this.set( masses );
        });
    }

    change(event : any ) {
        this.load();
    }

    launch( masse : Masse ) {
        masse.launched = 1;
        this.http.patch('/api/masses?unused=1', masse )
        .map(response => {
            return response.json();
        })
        .subscribe((masses: Masse[])=> {
            this.set( masses );
        })
    }

    private set( masses : Masse[]) {
        this.remaining = 0;
        this.remainingLaunched = 0;
        masses.forEach(( masse: any, i : number, masses: Masse[] ) => {
            masses[i].remaining = 0;
            masse.programmations.forEach(( programmation: any) => {
                 masses[i].remaining += programmation.pause;
                 this.remaining += programmation.pause;
                 console.log(this.remaining);
                 if( masses[i].launched ) this.remainingLaunched += programmation.pause;
            });
        });
        this.masses = masses;
    }
}