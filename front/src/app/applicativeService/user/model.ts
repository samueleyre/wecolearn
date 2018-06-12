export class User {
    
    constructor( 
    		public id: number|null = null,
    		public username: string = "",
    		public email : string = "",
    		public password : string = "",
    		public confirmPassword : string = ""
    	) {

    }
}