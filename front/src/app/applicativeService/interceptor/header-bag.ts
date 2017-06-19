import { Injectable }			from '@angular/core';
import { PaginationService }	from './../pagination/service';
import { TokenService	}		from './../token/service';

@Injectable()
export class HeaderBag {
	constructor(private tokenService: TokenService ) {

	}

	get(params : any|undefined ):any[] {
		console.log('PARAMS', params )
		let ret = [ 
		  //{ 'Content-Type' : 'application/json'},
          { name : 'Authorization' ,  value : 'Bearer ' + this.tokenService.get() },
          { name : 'X-Pagination' , value :   PaginationService.toHeader() }
         ];

         return ret;
	}
}