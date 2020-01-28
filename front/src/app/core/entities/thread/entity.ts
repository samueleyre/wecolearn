import { Image } from '~/core/entities/image/entity';

import { Message } from '../message/entity';

/**
 * Thread represents a group of Users exchanging Messages
 */
export class Thread {
  id: number;
  lastMessage: Message;
  name: string;
  image: Image;
  countNotRead: number;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || '';
    this.image = obj && obj.image || null;
    this.lastMessage = obj && obj.lastMessage || null;
    this.countNotRead = obj && obj.countNotRead || 0;
  }
}

