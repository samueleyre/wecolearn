export class Entity {

	public used : number = 0;

	public serialize(): object {
		let ret  = {};
		this.recurse( this, ret );
		return ret;
	}

	private  recurse( ref: any, ret : any ) {
		Object.getOwnPropertyNames(ref).forEach(name => {
	        if( typeof ref[name]!== 'object' ) {
	        	ret[name] = ref[name];
	        } else {
	        	ret[name] = {};
	        	this.recurse(ref[name],ret[name])
	        }
		});
	}

	public set( entityObject : any ) {
		for( let name in entityObject ) {
			this[name] = entityObject[name];
		}
	}
}