import {IEntity} from "../../entity/interface";
import {Entity} from "../../entity/entity";

/**
 * Message represents one message being sent in a Thread
 */
export class City extends Entity implements IEntity  {


    id: number;
    latitude: number;
    longitude: number;
    name:string;


    constructor(obj?: any) {
        super();
        this.id              = obj && obj.id              || null;
        this.latitude        = obj && obj.latitude        || null;
        this.longitude       = obj && obj.longitude       || null;
        this.name            = obj && obj.name            || null;
    }


}
