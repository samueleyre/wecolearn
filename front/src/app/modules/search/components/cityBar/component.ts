import {
  Component,
  OnInit,
  Output,
  Injectable,
  EventEmitter,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { City } from '~/core/entities/city/entity';
import { city } from '~/config/city';

import { SearchService } from '../../../../core/services/search/search.service';

@Component({
  selector: 'app-citybar',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class CityBarComponent implements OnInit {
  @Output() userUpdated = new EventEmitter();

  public searchInput: string;
  public searchAutoComplete: any[];
  private defaultCity: City;

  constructor(private searchService: SearchService) {
    this.defaultCity = city.default;
  }

  ngOnInit() {
    this.searchAutoComplete = [this.defaultCity];
    this.searchInput = 'Lyon';
  }

  onChange() {
    // if value is changed -> channel city
    this.searchService.addSearchParameter('city', this.searchInput);
    this.userUpdated.emit(this.searchInput);
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name}</span>`;
    return html;
  }
}
