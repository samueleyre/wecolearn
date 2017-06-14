
import { Pagination } 		from './pagination';
import { EmitterService}	from './../emitter/service';
import { Observable }       from "rxjs/Rx";


export class PaginationService {

	public static pagination: Pagination;
	
	static init(): void {
		if(!PaginationService.pagination) {
			PaginationService.pagination = new Pagination( 1, 7, 1 , false);
		}
	}

	static disable() {
		PaginationService.pagination.disabled = true;
	}

	static enable() {
		PaginationService.pagination.disabled = false;	
	}
	
	static first(): number {
		PaginationService.pagination.page = 1;
		return PaginationService.pagination.page;
	}
	
	static previous(): boolean {
		let ret = false;
		if( PaginationService.pagination.page > 1 ) { 
			PaginationService.pagination.page --;
			ret = true;
		}
		return ret;
	}

	static page( page: number ): number {
		let ret = page;
		if( page > 0 && page <= PaginationService.pagination.maxPage ) {
			PaginationService.pagination.page = page;
		} else {
			ret = PaginationService.pagination.page; 
		}
		return ret;
	}

	static next(): boolean {
		let ret = false;
		if ( PaginationService.pagination.page <= PaginationService.pagination.maxPage ) { 
			PaginationService.pagination.page ++;
			ret = true;
		}
		return ret;

	}

	static last(): number {
		PaginationService.pagination.page = PaginationService.pagination.maxPage;
		return PaginationService.pagination.page;
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
		if( header ) {
			let matches = header.match(/^page=(\d+) perPage=(\d+) maxPage=(\d+)$/);
			if( matches[1] && matches[2] && matches[3] ) {
				PaginationService.pagination = new Pagination( 
						parseInt(matches[1]), 
						parseInt(matches[2]), 
						parseInt(matches[3]),
						false
					)
				;
				let pages = [];
				
				for( var i=1; i <= PaginationService.pagination.maxPage;i++) {
					pages.push(i);
				}
				EmitterService.get('PAGINATION_CHANGE').emit( pages );
			}
		}
	}

	static toHeader():string {
		
		if(! PaginationService.pagination ) PaginationService.init();

		let page = PaginationService.pagination.page;
		let perPage = PaginationService.pagination.perPage;

		let disabled = '';
		if( true == PaginationService.pagination.disabled ) {
			PaginationService.enable();
			disabled = ' disabled=1';
		}
		
		return `page=${page} perPage=${perPage}${disabled}`;
	}

	static change():Observable<Array<number>> {
		return EmitterService.get('PAGINATION_CHANGE');
	}
}