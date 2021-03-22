import { UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { Community } from '~/core/entities/domain/community';

// tslint:disable variable-name
import { Tag } from '../tag/entity';
import { Message } from '../message/entity';
import { Image } from '../image/entity';
import { SlackAccount } from '../slackAccount/entity';

export class User {
  public id?: number;
  public email?: string;
  public password?: string;
  public first_name: string;
  public last_name: string;
  public roles: UserRoleEnum[];
  public domains?: Community[];
  public profil_url?: string;
  public biographie?: string;
  public intensity?: number;
  public atmosphere?: number;
  public latitude?: number;
  public longitude?: number;
  public city?: string;
  public learn_tags?: string[];
  public know_tags?: string[];
  public teach_tags?: string[];
  public tags: Tag[];
  public messages?: Message[];
  public sent_messages?: Message[];
  public received_messages?: Message[];
  public image?: Image;
  public show_profil?: boolean;
  public new_message_notification?: boolean;
  public new_message_email?: boolean;
  public new_match_notification?: boolean;
  public new_match_email?: boolean;
  public newsletter?: boolean;
  public slack_accounts?: SlackAccount[];
  public user_notified?: Date;
  public notification_subscribe?: boolean;
  public email_confirmed?: boolean;
  public created?: any;
  public deleted?: string;


  constructor(obj?: any) {
    // always present
    this.first_name = obj && 'first_name' in obj ? obj.first_name : '';
    this.last_name = obj && 'last_name' in obj ? obj.last_name : '';
    this.tags = obj && 'tags' in obj ? obj.tags : [];

    if (obj) {
      if ('biographie' in obj) {
        this.biographie = obj.biographie;
      }
      if ('learn_tags' in obj) {
        this.learn_tags = obj.learn_tags;
      }
      if ('email' in obj) {
        this.email = obj.email;
      }
      if ('password' in obj) {
        this.password = obj.password;
      }
      if ('created' in obj) {
        this.created = obj.created;
      }
      if ('profil_url' in obj) {
        this.profil_url = obj.profil_url;
      }
      if ('intensity' in obj) {
        this.intensity = obj.intensity;
      }
      if ('atmosphere' in obj) {
        this.atmosphere = obj.atmosphere;
      }
      if ('know_tags' in obj) {
        this.know_tags = obj.know_tags;
      }
      if ('teach_tags' in obj) {
        this.teach_tags = obj.teach_tags;
      }
      if ('messages' in obj) {
        this.messages = obj.messages;
      }
      if ('sent_messages' in obj) {
        this.sent_messages = obj.sent_messages;
      }
      if ('received_messages' in obj) {
        this.received_messages = obj.received_messages;
      }
      if ('latitude' in obj) {
        this.latitude = obj.latitude;
      }
      if ('longitude' in obj) {
        this.longitude = obj.longitude;
      }
      if ('city' in obj) {
        this.city = obj.city;
      }
      if ('image' in obj) {
        this.image = new Image(obj.image);
      }
      if ('show_profil' in obj) {
        this.show_profil = obj.show_profil;
      }
      if ('new_message_notification' in obj) {
        this.new_message_notification = obj.new_message_notification;
      }
      if ('new_message_email' in obj) {
        this.new_message_email = obj.new_message_email;
      }
      if ('new_match_notification' in obj) {
        this.new_match_notification = obj.new_match_notification;
      }
      if ('new_match_email' in obj) {
        this.new_match_email = obj.new_match_email;
      }
      if ('newsletter' in obj) {
        this.newsletter = obj.newsletter;
      }
      if ('slack_accounts' in obj) {
        this.slack_accounts = obj.slack_accounts;
      }
      if ('user_notified' in obj) {
        this.user_notified = obj.user_notified;
      }
      if ('notification_subscribe' in obj) {
        this.notification_subscribe = obj.notification_subscribe;
      }
      if ('roles' in obj) {
        this.roles = obj.roles;
      }
      if ('email_confirmed' in obj) {
        this.email_confirmed = obj.email_confirmed;
      }

      if ('id' in obj) {
        this.id = obj.id;
      }

      if ('domains' in obj) {
        this.domains = obj.domains;
      }
      if ('deleted' in obj) {
        this.deleted = obj.deleted;
      }
    }
  }
}
