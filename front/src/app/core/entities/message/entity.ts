// tslint:disable variable-name

import { User } from '../user/entity';
import { Thread } from '../thread/entity';

/**
 * Message represents one message being sent in a Thread
 */
export class Message {
  id: number;
  created: Date;
  is_read: boolean;
  sender: User;
  message: string;
  receiver: User;
  thread: Thread;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.is_read = obj && obj.is_read || false;
    this.created = obj && obj.created || new Date();
    this.sender = obj && obj.sender || null;
    this.message = obj && obj.message || '';
    this.receiver = obj && obj.receiver || null;
    this.thread = obj && obj.thread || null;
  }
}
