import { Injectable }			from '@angular/core';
import { Http, Response }		from '@angular/http';

import { Observable } 			from 'rxjs';
import 'rxjs/add/operator/map'

import { IEntity }                  from './../entity/interface' 
import { FilterService }			from './../../applicativeService/filter/service';

export class GPPDService {

	route: string = '/api';
	
	constructor( private http : Http ) {
		
	}

	setApi(route: string ){
		this.route = route;
	}

	private getFilterParams( filter ?: any  ) {
		let sep = '?';
		let ret = '';
		if( typeof filter !== 'undefined' ) {
			for( var field in filter ) {
				ret += sep + field + '=' + filter[field];
				sep = '&'; 
			}
		}
		return ret;
	}

	
	get(): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.get(`${this.route}${params}`).map((response: Response) => {
				return response.json();
			})
		;
	}

	

	patch(entity: any ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();
		
		return this.http.patch(`${this.route}${params}`, entity).map((response: Response) => {
				return response.json();
			})
		;
	}

	post( entity:any ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.post(`${this.route}${params}`, entity).map((response: Response) => {
				return response.json();
			})
		;
	}

	delete(id: any  ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.delete(`${this.route}/${id}${params}`).map((response: Response) => {
				return response.json();
			})
		;
	}
}