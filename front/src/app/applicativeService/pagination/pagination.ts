export class Pagination {

	public perPage: number = 5;
	public page: number = 1;
	public maxPage: number = 1;

	constructor( page:number, perPage: number, maxPage: number) {
		this.page = page;
		this.maxPage = maxPage;
		this.perPage = perPage;
	}
}