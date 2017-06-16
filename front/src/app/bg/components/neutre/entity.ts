import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Neutre extends Entity implements IEntity  {

	public id: 		number|null;
	public phrase : 	string;
	public idLanguage: number;
	
	constructor() {
		super();
		this.id = null;
		this.phrase = '';
		this.idLanguage = 1;
		
	}
}