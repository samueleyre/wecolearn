import { 
        Component, 
        OnInit,
        Injectable,
        Input 
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { DomSanitizer }               from '@angular/platform-browser'
import { Evolution }                  from './model';
import { EvolutionService }           from './service'; 

@Component({
    templateUrl: 'template.html',
    selector : 'evolution',
})

@Injectable()
export class EvolutionComponent implements OnInit {
    
    public progTime : number = 300;
    public sanitizedPercent : any;
    
    @Input() public idMasse: number;
    
    constructor(protected http:Http, private sanitizer : DomSanitizer, private service : EvolutionService ) {
        this.sanitizedPercent = this.sanitizer.bypassSecurityTrustStyle(`1%`);
    }

    ngOnInit() {
        this.service.getEvolutions()
        .subscribe( ( evolutions : Evolution[]) => {
            this.setProgress( evolutions );
        });
    }

    private setProgress( evolutions : Evolution[] ) {
        evolutions.forEach( (evolution: any) => {
            if( evolution.idMasse == this.idMasse ) {
                let end = 10 * ( parseInt(evolution.lastProgrammation) * ( this.progTime ) + parseInt(evolution.last) - parseInt(evolution.lastProgrammation));
                let string =  parseInt(evolution.elapsed) / end * 100  + '%'
                this.sanitizedPercent = this.sanitizer.bypassSecurityTrustStyle(string);
            }
        })
    } 
}