import { Injectable }			from '@angular/core';
import { Http, Response }		from '@angular/http';

import { Observable } 			from 'rxjs';
import 'rxjs/add/operator/map'

import { IEntity }                  from './../entity/interface' 


export class GPPDService {

	route: string = '/api';
	
	constructor( private http : Http ) {}

	setApi(route: string ){
		this.route = route;
	}

	
	get(): Observable<IEntity[]> {
		return this.http.get(`${this.route}`).map((response: Response) => {
				return response.json();
			})
		;
	}

	

	patch(entity: any ): Observable<IEntity[]> {
		console.log( 'serialiazed', entity.serialize());
		return this.http.patch(`${this.route}`, entity.serialize()).map((response: Response) => {
				return response.json();
			})
		;
	}

	post( entity:any ): Observable<IEntity[]> {
		return this.http.post(`${this.route}`, entity.serialize()).map((response: Response) => {
				return response.json();
			})
		;
	}

	delete(id: any  ): Observable<IEntity[]> {
		return this.http.delete(`${this.route}/${id}`).map((response: Response) => {
				return response.json();
			})
		;
	}
}