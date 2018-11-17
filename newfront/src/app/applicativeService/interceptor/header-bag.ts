import { Injectable }			from '@angular/core';
import { PaginationService }	from './../pagination/service';
import { TokenService	}		from './../token/service';
import {Router} from "@angular/router";

@Injectable()
export class HeaderBag {
	constructor(private tokenService: TokenService, private router: Router ) {

	}

	get(params : any|undefined ):any[] {
		return [
		  //{ 'Content-Type' : 'application/json'},
          { name : 'Authorization' ,  value : 'Bearer ' + this.tokenService.get() },
          // { name : 'subdomain' , value : this.getSubDomain()}
          // { name : 'X-Pagination' , value :   PaginationService.toHeader() }
         ];

	}

  // getSubDomain() {
	//    console.log("location ", this.router.url)
  //   const location = this.router.url;
  //   if (process.env.NODE_ENV === 'production') {
  //     var regex = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i;
  //     var subdomain = location.match(regex)[1];
  //     console.log("domain", subdomain)
  //     if (null !== subdomain && "www" !== subdomain ) {
  //       return subdomain;
  //     } else {
  //       return "main";
  //     }
  //
  //   } else {
  //     return "main";
  //   }
  //
  //
  //
  //
  // }
}

