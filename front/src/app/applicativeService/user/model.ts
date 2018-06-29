import {Entity} from "../entity/entity";
import {IEntity} from "../entity/interface";

export class User extends Entity implements IEntity {
    
    constructor( 
    		public id: number|null = null,
    		public username: string = "",
    		public email : string = "",
    		public password : string = "",
    		public confirmPassword : string = "" // IS THiS USEFUL !!
    	) {
      super();

    }
}