import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Clef extends Entity implements IEntity  {

	public id: number|null;
	public name: string;
	public url: string;
	public idClient : number;
	public idLanguage: number;

	constructor() {
		super();
		this.id = null;
		this.name = '';
		this.url = 'http://';
		this.idLanguage = 1;
	}
}