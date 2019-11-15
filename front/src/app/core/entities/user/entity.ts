import { UserRoleEnum } from '~/core/enums/user/user-role.enum';

// tslint:disable variable-name
import { Tag } from '../tag/entity';
import { Message } from '../message/entity';
import { Image } from '../image/entity';
import { SlackAccount } from '../slackAccount/entity';

export class User {
  public id: number | null;
  public email: string;
  public password: string;
  public first_name: string;
  public last_name: string;
  public roles: UserRoleEnum[];
  public profil_url: string;
  public biographie: string;
  public intensity: number;
  public atmosphere: number;
  public latitude: number;
  public longitude: number;
  public learn_tags: string[];
  public know_tags: string[];
  public teach_tags: string[];
  public tags: Tag[];
  public messages: Message[];
  public sent_messages: Message[];
  public received_messages: Message[];
  public image: Image;
  public show_profil: boolean;
  public email_notifications: boolean;
  public slack_accounts: SlackAccount[];
  public user_notified: Date;
  public notification_subscribe: boolean | null;

  public created: any;


  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : null;
    this.email = '';
    this.password = '';
    this.created = null;
    this.first_name = obj && obj.first_name ? obj.first_name : '';
    this.last_name = obj && obj.last_name ? obj.last_name : '';
    this.profil_url = obj && obj.profil_url ? obj.profil_url : 'http://';
    this.biographie = obj && obj.biographie ? obj.biographie : '';
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
    this.image = obj && obj.image ? obj.image : new Image();
    this.show_profil = false;
    this.email_notifications = true;
    this.slack_accounts = obj && obj.slack_accounts ? obj.slack_accounts : [];
    this.user_notified = null;
    this.notification_subscribe = false;
    this.roles = null;
  }
}
