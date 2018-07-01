import { Client } from '../client/entity';
import { Thread } from '../thread/entity';
import {IEntity} from "../../../applicativeService/entity/interface";
import {Entity} from "../../../applicativeService/entity/entity";

/**
 * Message represents one message being sent in a Thread
 */
export class Message extends Entity implements IEntity  {


    id: number;
    created: Date;
    is_read: boolean;
    sender: Client;
    message: string;
    receiver : Client;
    thread: Thread;

    constructor(obj?: any) {
        super();
      this.id              = obj && obj.id              || null;
      this.is_read          = obj && obj.is_read          || false;
      this.created       = obj && obj.created             || new Date();
      this.sender          = obj && obj.sender          || null;
      this.message          = obj && obj.message            || null;
      this.receiver        = obj && obj.receiver        || null;
      this.thread          = obj && obj.thread          || null;
    }


}
