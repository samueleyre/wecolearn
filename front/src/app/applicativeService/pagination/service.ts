
import { Pagination } 		from './pagination';
import { EmitterService}	from './../emitter/service';
import { Observable }       from "rxjs/Rx";


export class PaginationService {

	public static pagination: Pagination;

	init(): void {
		PaginationService.pagination = new Pagination( 1, 5, 1 );
	}
	
	first() : number {
		return 1;
	}
	
	previous() : boolean {
		let ret = false;
		if( PaginationService.pagination.page > 1) { 
			PaginationService.pagination.page --;
			ret = true;
		}
		return ret;
	}

	next(): boolean {
		let ret = false;
		if ( PaginationService.pagination.page < PaginationService.pagination.maxPage ) { 
			PaginationService.pagination.page ++;
			ret = true;
		}
		return ret;

	}

	last() : number {
		return PaginationService.pagination.maxPage;
	}

	/*
	static setPagination( page, maxPage, perPage ): void {
		PaginationService.pagination = new Pagination( page, perPage, maxPage );
	}

	static getPagination(): Pagination {
		return PaginationService.pagination;
	}
	*/

	static fromHeader( header: string ): void {
		let matches = header.match('/^page=(\d+) perPage=(\d+) maxPage=(\d+)$/');
		if( matches[1] && matches[2] && matches[3] ) {
			PaginationService.pagination = new Pagination( 
					parseInt(matches[1]), 
					parseInt(matches[2]), 
					parseInt(matches[3])
				)
			;
			let pages = [];
			
			for( var i=1; i <= PaginationService.pagination.maxPage;i++) {
				pages.push(i);
			}
			EmitterService.get('PAGINATION_CHANGE').emit( pages );
		}
	}

	static toHeader():string {
		
		let page = PaginationService.pagination.page;
		let perPage = PaginationService.pagination.perPage;
		
		return `page=${page} perPage=${perPage}`;
	}

	change():Observable<Array<number>> {
		return EmitterService.get('PAGINATION_CHANGE');
	}
}