import {
  Component,
  OnInit,
  Injectable, Output, EventEmitter, Input
} from '@angular/core';

import {Observable} from 'rxjs';


import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../../applicativeService/entity/interface';


import { MessageService }         from './../../../../../applicativeService/message/service';
import { SearchService }         from './../../../../service/search';
import {log} from "util";
import {SafeHtml} from "@angular/platform-browser";


@Component({
    selector : 'searchOsm',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchOsmComponent implements OnInit {


  private searchInput : string = "";

  @Output() latitudeChange = new EventEmitter<number>();
  @Output() longitudeChange = new EventEmitter<number>();


  constructor( private searchService: SearchService) {
  }


    ngOnInit() {
    }


    setAddress(selectedAddress:any = null) {

    // console.log("set address", selectedAddress)
    this.latitudeChange.emit(selectedAddress.lat);
    this.longitudeChange.emit(selectedAddress.lon);


    }

    observableSource(text: string) {
      return this.searchService.searchOsmNames(text);
    }


  autocompleListFormatter = (data: any) => {
    // let html = `${data.name}`;
    let ret = data.name;
    if (data.street && data.street !== "") {
      ret+= " , " + data.street;
    }
    return ret;
  }

}