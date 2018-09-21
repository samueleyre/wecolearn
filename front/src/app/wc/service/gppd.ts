import { Injectable }			from '@angular/core';
import { Response, Http }		from '@angular/http';
import {HttpClient} from "@angular/common/http";


import { Observable } 			from 'rxjs';
import 'rxjs/add/operator/map'

import { IEntity }                  from '../../applicativeService/entity/interface'
import { FilterService }			from './../../applicativeService/filter/service';
import {log} from "util";

export class GPPDService {

	route: string = '/api';
	
	constructor( protected http : Http ) {
		
	}

	setApi(route: string ){
		this.route = route;
	}

	
	get(): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.get(`${this.route}${params}`).map((response: Response) => {
				// console.log(response);
				return response.json();
			})
		;
	}

	getOne(): Observable<IEntity> {
		
		let params = FilterService.getUrlParams();

		return this.http.get(`${this.route}${params}`).map((response: Response) => {
				// console.log(response);
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

	patchOne(entity: any ): Observable<IEntity> {
		
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