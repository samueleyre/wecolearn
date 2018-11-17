import { Injectable, EventEmitter }			from '@angular/core';
import { Http} 								from '@angular/http';

import {CacheService, CacheStoragesEnum} 	from 'ng2-cache/ng2-cache';
import { PaginationService } 				from './../pagination/service';


@Injectable()
export class CacheUrlService {

	constructor( protected cacheService : CacheService, protected http: Http ) {

	}

	get(url : string, paginationDisabled?: boolean ) :EventEmitter<any> {
		if(typeof paginationDisabled === 'undefined') paginationDisabled = true;
		let ret = new EventEmitter();
		let data = this.cacheService.get(url);
		if( null === data) {
			if( paginationDisabled ) PaginationService.disable();
			this
			.http
			.get( url ).map(response => {
				return response;
			}).subscribe((response: any) => {
				//console.log(response);
				this.cacheService.set(url, response, { maxAge : 60 });
				ret.emit( response);
			});
		} else {
			setTimeout(
					() => { ret.emit(data);},0);
		}
		return ret;
	}
}