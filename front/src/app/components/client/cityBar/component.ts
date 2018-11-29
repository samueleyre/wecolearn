import {
    Component,
    OnInit,
    Output,
    Injectable,
    EventEmitter
} from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SearchService } from '../../../service/search';
import { City } from '../../../entities/city/entity';
import {LoggedService} from '../../../service/logged';

@Component({
    selector : 'app-citybar',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class CityBarComponent implements OnInit {

    @Output() userUpdated = new EventEmitter();

    private searchInput : string;
    private searchAutoComplete : Array<any>;
    private defaultCity: City;

    constructor(private searchService: SearchService,
                private LoggedService: LoggedService,) {
      this.defaultCity = this.searchService.getDefaultCity();
    }

    ngOnInit() {
      this.searchAutoComplete = [this.defaultCity];
      this.searchInput = "Lyon";
    }

    onChange() {
        // if value is changed -> channel city
      this.searchService.addSearchParameter("city", this.searchInput);
      this.userUpdated.emit(this.searchInput);

    }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return html;
  }


    

}