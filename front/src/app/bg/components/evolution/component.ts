import { 
        Component, 
        OnInit,
        Injectable,
        Input,
        Output,
        EventEmitter
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { DomSanitizer }               from '@angular/platform-browser'
import { Evolution }                  from './model';
import { EvolutionService }           from './service';
import { EvolutionEvent }             from './event'; 

@Component({
    templateUrl: 'template.html',
    selector : 'evolution',
})

@Injectable()
export class EvolutionComponent implements OnInit {
    
    public progTime : number = 2;
    public sanitizedPercent : any;
    public remaining : Date|string = 'NC'; 
    
    @Input() public idMasse: number;
    @Output() public reload: EventEmitter<boolean> = new EventEmitter();
    @Output() public remainsChange: EventEmitter<number> = new EventEmitter();
    
    constructor(protected http:Http, private sanitizer : DomSanitizer, private service : EvolutionService ) {
        this.sanitizedPercent = this.sanitizer.bypassSecurityTrustStyle(`1%`);
    }

    ngOnInit() {
        this.service.getEvolutions()
        .subscribe( ( event: EvolutionEvent ) => {
            this.setProgress( event.evolutions, event.isHot );
        });
    }

    private setProgress( evolutions : Evolution[] , isHot : boolean ) {
        let hasOneMasse = false;
        evolutions.forEach( ( evolution: any ) => {
            if( evolution.idMasse == this.idMasse ) {
                hasOneMasse = true;
                let end = ( parseInt(evolution.lastProgrammation) * 60 *( this.progTime ) + parseInt(evolution.last)* 60 - parseInt(evolution.lastProgrammation) );
                let string =  parseInt(evolution.elapsed) / end * 100  + '%'
                this.sanitizedPercent = this.sanitizer.bypassSecurityTrustStyle(string);
                let _now = new Date();
                this.remaining = new Date(_now.getTime() + 1000 * end );
                this.remainsChange.emit( end );
            }
        });
        if( !hasOneMasse && isHot ) {
            this.reload.emit( true );
        }
    } 
}