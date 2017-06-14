export class Pagination {

	public perPage: number = 10;
	public page: number = 1;
	public maxPage: number = 1;
	public disabled: boolean = false;

	constructor( page:number, perPage: number, maxPage: number, disabled : boolean ) {
		this.page = page;
		this.maxPage = maxPage;
		this.perPage = perPage;
		this.disabled = disabled;
	}
}