export class FilterService {

	protected static filters : any;

	public static addFilter( field: string, value: number ) {
		FilterService.init();
		FilterService.filters[field] = value;

		console.log('filters', FilterService.filters );
	}

	public static init() {
		if( typeof FilterService.filters === 'undefined') {
			FilterService.filters = {};
		}
	}

	public static clear() {
		FilterService.filters = {};
	}

	public static getUrlParams() {
		
		FilterService.init();
		let sep = '?';
		let ret = '';
		if( FilterService.filters !== 'undefined' ) {
			for( var field in FilterService.filters ) {
				ret += sep + field + '=' + FilterService.filters[field];
				sep = '&'; 
			}
		}
		return ret;
	}
}