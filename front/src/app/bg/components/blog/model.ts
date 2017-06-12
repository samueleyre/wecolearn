import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Blog extends Entity implements IEntity  {

	public id: 		number|null;
	public name : 	string;
	public url: string;
	public login: string;
	public pass: string;

	constructor() {
		super();
		this.id = null;
		this.name = '';
		this.url = 'http://';
		this.login = '';
		this.pass = '';
	}
}