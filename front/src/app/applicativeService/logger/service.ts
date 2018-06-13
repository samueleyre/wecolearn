import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {

    constructor() {}

    log(one: any, two: any = null){
        if (process.env.ENV !== "production") {
            console.log(one, two)
        }
    }


}



