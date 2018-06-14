import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {

    constructor() {}

    log(one: any, two: any = null,three: any = null){
        if (process.env.ENV !== "production") {
            if (null !== three) console.log(one, two, three)
            else if (null !== two) console.log(one, two)
            else console.log(one)
        }
    }


}



