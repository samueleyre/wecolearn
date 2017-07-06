import { Injectable, EventEmitter }		from '@angular/core';
import { Http }							from '@angular/http';
import { Evolution }					from './model';
import { EvolutionEvent }             	from './event';
import { PaginationService }			from './../../../applicativeService/pagination/service'; 

@Injectable()
export class EvolutionService {

	private reload : boolean = true;
	private emitter : EventEmitter<EvolutionEvent> = new EventEmitter();
	private loopEmitter : EventEmitter<any> = new EventEmitter();

	private waitFor: number = 5000;
	private firstLoops: number = 0;

	constructor( private http: Http ) {
		this.loopEmitter.subscribe( ( event:any ) => {
			this.reload = true;
			console.log('Subscribed');
			this.load();
		});
	}

	getEvolutions() {
		return this.emitter;
	}

	launch(first?:boolean) {
		
		if(!this.reload || first ) this.loopEmitter.emit(true);
		
	}

	private load() {
		setTimeout(() => {
			PaginationService.disable();
			this.firstLoops ++;
			this.http.get('/api/evolutions').map( response => {
				return response.json();
			}).subscribe((evolutions: Evolution[]) => {
				//console.log('Evolutions', evolutions );
				let isHot = ( this.firstLoops * this.waitFor ) >= 1000 * 610 ;
				if( evolutions.length == 0 && isHot ) { 
					this.reload = false;
				}
				let event = new EvolutionEvent();
				event.evolutions = evolutions;
				event.isHot = isHot;
				this.emitter.emit( event );
				if( this.reload ) {
					this.load();
					
				}
			});	
		},this.waitFor );
	}
}