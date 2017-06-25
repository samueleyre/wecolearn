import { Injectable, EventEmitter }		from '@angular/core';
import { Http }							from '@angular/http';
import { Evolution }					from './model';

@Injectable()
export class EvolutionService {

	private reload : boolean = true;
	private emitter : EventEmitter<Evolution[]> = new EventEmitter();
	private loopEmitter : EventEmitter<any> = new EventEmitter();

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
			this.http.get('/api/evolutions').map( response => {
				return response.json();
			}).subscribe((evolutions: Evolution[]) => {
				console.log('Evolutions', evolutions );
				if( evolutions.length == 0 ) this.reload = false; 
				this.emitter.emit( evolutions );
				if( this.reload ) {
					this.load();
					
				}
			});	
		},5000 );
	}
}