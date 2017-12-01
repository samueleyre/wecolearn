import {
    Component,
    OnInit,
    Output,
    Injectable,
    EventEmitter
}                             from '@angular/core';

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";



@Component({
    selector : 'cityBar',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class CityBarComponent implements OnInit {

    @Output() userUpdated = new EventEmitter();

    private searchInput : string;
    private searchAutoComplete : Array<any>;

    constructor() {
    }

    ngOnInit() {
      this.searchAutoComplete = [{id: 1, latitude: 45.75, longitude: 4.85, name:"Lyon"}]
    }

    onChange() {
        // if value is changed -> channel city
      this.userUpdated.emit(this.searchInput);
    }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return html;
  }


    

}