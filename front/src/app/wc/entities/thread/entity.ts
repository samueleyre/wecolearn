import { Message } from '../message/entity';
import {IEntity} from "../../entity/interface";
import {Entity} from "../../entity/entity";

/**
 * Thread represents a group of Users exchanging Messages
 */
export class Thread extends Entity implements IEntity {
    id: number;
    lastMessage: Message;
    name: string;
    avatarSrc: string;

    constructor(id?: number,
                name?: string,
                avatarSrc?: string) {
        super();
        this.id = id || null;
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}
