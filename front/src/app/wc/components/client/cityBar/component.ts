import {
    Component,
    OnInit,
    Output,
    Injectable,
    EventEmitter
}                             from '@angular/core';

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SearchService }         from './../../../service/search';
import { City }                from './../../../entities/city/entity';

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
    private defaultCity: City;

    constructor(private searchService: SearchService) {
      this.defaultCity = new City({id: 1, latitude: 45.75, longitude: 4.85, name:"Lyon"})
    }

    ngOnInit() {
      this.searchAutoComplete = [this.defaultCity];
      this.searchService.addSearchParameter("city", this.defaultCity);
    }

    onChange() {
        // if value is changed -> channel city
      console.log(this.searchInput);
      this.searchService.addSearchParameter("city", this.searchInput);
      this.userUpdated.emit(this.searchInput);

    }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return html;
  }


    

}