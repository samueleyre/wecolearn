import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PeriodService {

    public change = new Subject<string>();

    emitDateChange(val: string) {
        this.change.next(val);
    }



}

