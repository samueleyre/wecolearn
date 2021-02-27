import { Tag } from '~/core/entities/tag/entity';
import { Image } from '~/core/entities/image/entity';

export interface UserPutInterface {
  first_name?: string;
  last_name?: string;
  biographie?: string;
  intensity?: number;
  atmosphere?: number;
  latitude?: number;
  longitude?: number;
  city?: string;
  tags?: Tag[];
  image?: Image;
  show_profil?: boolean;
  new_message_notification?: boolean;
  new_message_email?: boolean;
  new_match_notification?: boolean;
  new_match_email?: boolean;
  newsletter?: boolean;
}
