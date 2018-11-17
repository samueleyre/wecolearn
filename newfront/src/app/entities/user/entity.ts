import { IEntity } from '../../applicativeService/entity/interface';
import { Entity } from '../../applicativeService/entity/entity';
import { Tag } from '../tag/entity';
import { Message } from '../message/entity';
import { Image } from '../image/entity';
import { SlackAccount } from '../slackAccount/entity';

export class User extends Entity implements IEntity  {

	public id: 		number|null;
	public email: string;
	public created : any;
	public first_name : 	string;
	public last_name : 	string;
	public profil_url: string;
	public biographie: string;
	public intensity: number;
	public atmosphere: number;
	public latitude: number;
	public longitude: number;
	public learn_tags: Array<string>;
	public know_tags: Array<string>;
	public teach_tags: Array<string>;
	public tags: Array<Tag>;
	public messages: Array<Message>;
	public sent_messages: Array<Message>;
	public received_messages: Array<Message>;
	public avatarSrc : string;
	public image : Image;
	public show_profil: boolean;
	public email_notifications: boolean;
	public slack_accounts: Array<SlackAccount>;



	constructor(id?: number, slack_accounts? : Array<SlackAccount>) {
		super();
		this.id = id || null;
		this.email = '';
		this.created = null;
		this.first_name = '';
		this.last_name = '';
		this.profil_url = 'http://';
		this.biographie = '';
		this.intensity = null;
		this.atmosphere = null;
		this.learn_tags = [];
		this.know_tags = [];
		this.teach_tags = [];
		this.tags = [];
		this.messages = [];
		this.sent_messages = null;
		this.received_messages = null;
		this.latitude = null;
		this.longitude = null;
		this.avatarSrc = "default_avatar_200px.png";
		this.image = new Image();
		this.show_profil = false;
		this.email_notifications = true;
		this.slack_accounts = slack_accounts || [];
    }
}