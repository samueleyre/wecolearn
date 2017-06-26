import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Recherche extends Entity implements IEntity  {

	public id: number|null;
	public name: string;
	public recherche: string;
	public url : string;

	constructor() {
		super();
		this.id = null;
		this.name = '';
		this.url = 'http://';
		this.recherche = '';
	}
}