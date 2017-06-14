import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Ancre extends Entity implements IEntity  {

	public id: 		number|null;
	public phrase: 	string;
	public idLanguage: string;

	constructor() {
		super();
		this.id = null;
		this.phrase = '';
		this.idLanguage = 1;
	}
}