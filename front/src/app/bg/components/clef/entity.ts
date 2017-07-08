import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Clef extends Entity implements IEntity  {

	public id: number|null;
	public phrase: string;
	public url: string;
	public idClient : number;
	public idLanguage: number;
	public used: number|null = null;

	constructor() {
		super();
		this.id = null;
		this.phrase = '';
		this.url = 'http://';
		this.idLanguage = 1;
	}
}