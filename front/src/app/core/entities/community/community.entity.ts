import { Image } from '~/core/entities/image/entity';
import { TokenEntity } from '~/core/entities/shared/token.entity';
import { User } from '~/core/entities/user/entity';

export class CommunityEntity {
  public id: number | null;
  public name: string;
  // tslint:disable-next-line:variable-name
  public community_admins?: User[];
  public count?: number;
  public image?: Image;
  // tslint:disable-next-line:variable-name
  public is_main?: boolean;
  // tslint:disable-next-line:variable-name
  public invite_token?: TokenEntity;

  constructor(obj?: any) {
    this.name = obj && obj.name ? obj.name : null;
    this.count = obj && obj.count ? obj.count : null;
    this.community_admins = obj && 'community_admins' in obj ? obj.community_admins : [];
    if (obj) {
      if ('id' in obj) {
        this.id = obj.id;
      }
      if ('image' in obj) {
        this.image = new Image(obj.image);
      }
      if ('is_main' in obj) {
        this.is_main = obj.is_main;
      }
      if ('invite_token' in obj) {
        this.invite_token = new TokenEntity(obj.invite_token);
      }
      if ('invite_token' in obj) {
        this.invite_token = new TokenEntity(obj.invite_token);
      }
    }
  }
}
