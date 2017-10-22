import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Client extends Entity implements IEntity  {

	public id: 		number|null;
	public user: {
		username: string,
		email: string
	};
	public first_name : 	string;
	public last_name : 	string;
	public profil_url: string;
	public biographie: string;
	public learn_tags: [string];
	public know_tags: [string];
	public teach_tags: [string];
	public tags: [string];



	constructor() {
		super();
		this.id = null;
		this.user = {
            username: '',
            email: ''
		};
		this.first_name = '';
		this.last_name = '';
		this.profil_url = 'http://';
		this.biographie = '';
		this.learn_tags = [''];
		this.know_tags = [''];
		this.teach_tags = [''];
		this.tags = [''];
	}
}