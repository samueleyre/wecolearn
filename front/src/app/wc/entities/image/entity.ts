import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
import {image} from "../../../applicativeService/constants/image";
export class Image extends Entity implements IEntity  {

    public id: 		number|null;
    public filename : 	string;

    constructor(id?: number , filename?:string ) {
        super();
        this.id = null;
        this.filename = filename || image.default_200px;

    }
}