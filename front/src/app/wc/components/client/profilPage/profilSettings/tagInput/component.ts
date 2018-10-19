import {
  Component,
  OnInit,
  Injectable, Input, Output, EventEmitter
} from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';

import {FormControl, NgForm} from '@angular/forms';

import { IEntity }                from '../../../../../../applicativeService/entity/interface';
import { Client }                from './../../../../../entities/client/entity';

import { MessageService }         from './../../../../../../applicativeService/message/service';
import {FilterService}            from "../../../../../../applicativeService/filter/service";
import {log} from "util";
import {Observable} from "rxjs";
import {TagService} from "../../../../../service/tag";


@Component({
    selector: 'tagInput',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class WcTagInputComponent implements OnInit {


  @Input() tags: any;
  @Input() tagListName: string;

  @Output() tagsChange = new EventEmitter<number>();


  constructor(
      protected tagService : TagService,
  ) {
    this.tagService = tagService;
  }

  ngOnInit() {}

  public requestAutocompleteItems = (text: string): Observable<Array<String>> => {
    return this.tagService.findTags(text);
  };

  private notAlphaNumeric(control: FormControl) {

    let regex = /^[a-z0-9]+$/i;
    if (regex.exec(control.value) === null) {
      return {
        'notAlphaNumeric': true
      };
    }

    return null;
  }

  public errorMessages = {
    'notAlphaNumeric': 'Le tag doit être alphanumerique.',
  };


  public validators = [this.notAlphaNumeric];

  private update(): void {
    this.tagsChange.emit(this.tags);
  }


}