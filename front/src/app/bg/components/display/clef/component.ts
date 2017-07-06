import { Component, 
		Input,
		Injectable, 
		OnInit,
		EventEmitter } 				    from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Clef }						from './../../../components/clef/entity';
import { CacheUrlService } 			from './../../../../applicativeService/cache_url/service';

@Component({
	selector: 'display-clef',
	template : `<span><a href="{{ url }}" target="_blank">{{ phrase }}</a></span>`
})
@Injectable()
export class DisplayClefComponent implements OnInit {

	public clefs: Clef[];
	public phrase : string = '';
	public url : string = '';
	public loaded : EventEmitter<Clef[]> = new EventEmitter();
	
	constructor( protected http: Http , protected cache: CacheUrlService) {
	
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		
		let endpoint = '/api/clefs';
		this.cache.get( endpoint  )
		.subscribe( ( clefs:Clef[] ) => {
			this.clefs = clefs;
			//console.log('CLEFs', clefs);
			this.loaded.emit( clefs );
		});
	}

	@Input()
	set idPhraseClef( idPhraseClef : number ) {
		this.loaded.subscribe(( clefs : Clef[]) => {	
			clefs.forEach( ( clef: Clef) => {
				if( clef.id == idPhraseClef ){ 
					this.phrase = clef.phrase;
					this.url = clef.url;
				}
			});
		});
	}
}