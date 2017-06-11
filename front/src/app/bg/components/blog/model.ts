export class Blog {

	public id: 		number|null;
	public name : 	string;
	public url: string;
	public login: string;
	public pass: string;

	constructor() {
		this.id = null;
		this.name = '';
		this.url = 'http://';
		this.login = '';
		this.pass = '';
	}
}