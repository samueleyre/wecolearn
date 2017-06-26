import { Component, 
		Input, 
		Injectable } 				from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Programmation }			from './../programmation/entity';

@Component({
	selector: 'exception',
	template : `
			<span [hidden]="isException || programmation.used">Non réalisé</span>
			<span [hidden]="isException || !programmation.used">Réalisé</span>
			<span [hidden]="!isException"><button (click)="relaunch($event)">En Exception, Relancer</button></span>
		`
})
@Injectable()
export class ExceptionComponent {

	@Input() public isException : number;
	@Input() public programmation : Programmation;

	constructor( protected http: Http ) {
	
	}

	relaunch(event : any ) {
		this.programmation.used = 0;
		this.programmation.isException = 0;
		this
		.http
		.patch('/api/programmations', this.programmation)
		.map(response =>{

		})
		.subscribe(() => {

		});
	} 
}