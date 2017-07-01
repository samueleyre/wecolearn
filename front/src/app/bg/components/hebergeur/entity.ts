import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Hebergeur extends Entity implements IEntity  {

	public id: number|null = null;
	public name: string = '';
	public ftpLogin: string = '';
	public ftpPassword : string = '';
	public accountLogin: string = '';
	public accountPassword: string = '';

	constructor() {
		super();
	}
}