import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
import { Tag } from './../../entities/tag/entity';
import { Message } from './../../entities/message/entity';

export class Client extends Entity implements IEntity  {

	public id: 		number|null;
	public user: {
		username: string,
		email: string
	};
	public created : any;
	public first_name : 	string;
	public last_name : 	string;
	public profil_url: string;
	public biographie: string;
	public intensity: number;
	public atmosphere: number;
	public latitude: number;
	public longitude: number;
	public learn_tags: [string];
	public know_tags: [string];
	public teach_tags: [string];
	public tags: Array<Tag>;
	public messages: Array<Message>;
	public sent_messages: Array<Message>;
	public received_messages: Array<Message>;
	public avatarSrc : string;



	constructor() {
		super();
		this.id = null;
		this.user = {
            username: '',
            email: ''
		};
		this.created = null;
		this.first_name = '';
		this.last_name = '';
		this.profil_url = 'http://';
		this.biographie = '';
		this.intensity = null;
		this.atmosphere = null;
		this.learn_tags = null;
		this.know_tags = null;
		this.teach_tags = null;
		this.tags = [];
		this.messages = [];
    	this.sent_messages = null;
    	this.received_messages = null;
        this.latitude = null;
        this.longitude = null;
        this.avatarSrc = "lesbricodeurs-200px.png";
    }
}