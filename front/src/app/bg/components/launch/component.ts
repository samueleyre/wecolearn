import { 
        Component, 
        OnInit,
        OnDestroy,
        Injectable 
   }                                  from '@angular/core';
import { NgForm }                     from '@angular/forms';
import { Http }                       from '@angular/http';

import { Masse }                      from './model';
import { GPPDService }                from './../../service/gppd';
import { GPPDComponent }              from './../../component/gppd';
import { PopinConfirmService }        from './../../../applicativeService/popin/confirm/service';
import { EvolutionService }            from './../evolution/service';
@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class LaunchComponent implements OnInit, OnDestroy {
    
    public masses:Masse[] = [];
    public remaining:number = 0;
    public remainingLaunched:number = 0;
    
    constructor( protected http:Http , private evolutionService : EvolutionService ) {

    }

    ngOnInit() {
        this.load();
        this.evolutionService.launch(true);
    }

    ngOnDestroy() {
        this.evolutionService.kill();
    }

    load( event?:any ) {
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
        this.evolutionService.launch();
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
        let oldRemainingLaunched = 0;
        let oldRemaining = 0;
        masses.forEach(( masse: any, i : number, masses: Masse[] ) => {
            this.remaining = 0;
            this.remainingLaunched = 0;
            masses[i].remaining = 0;
            masse.programmations.forEach(( programmation: any) => {
                 masses[i].remaining += programmation.pause + 1;
                 this.remaining += programmation.pause + 1;
                 if( masses[i].launched ) this.remainingLaunched += programmation.pause + 1;
            });
            if ( oldRemainingLaunched > this.remainingLaunched ) this.remainingLaunched = oldRemainingLaunched; 
            if ( oldRemaining > this.remaining ) this.remaining = oldRemaining;
            oldRemainingLaunched = this.remainingLaunched;  
            masses[i].remaining = masses[i].remaining;
        });
        this.remaining = this.remaining;
        this.remainingLaunched = this.remainingLaunched;
        this.masses = masses;
    }
}