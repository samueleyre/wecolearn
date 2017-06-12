import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Client extends Entity implements IEntity  {

	public id: number|null;
	public name: string;

	constructor() {
		super();
		this.id = null;
		this.name = '';
	}
}