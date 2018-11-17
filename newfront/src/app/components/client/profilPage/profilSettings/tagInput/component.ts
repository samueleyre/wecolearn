import {
  Component,
  OnInit,
  Injectable, Input, Output, EventEmitter
} from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';

import {FormControl, NgForm} from '@angular/forms';

import { IEntity } from '../../../../../../applicativeService/entity/interface';
import { User } from '../../../../../entities/user/entity';

import { MessageService } from './../../../../../../applicativeService/message/service';
import {FilterService} from '../../../../../../applicativeService/filter/service';
import {Observable} from 'rxjs';
import {TagService} from '../../../../../service/tag';


@Component({
    selector: 'app-taginput',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class WcTagInputComponent implements OnInit {


  public errorMessages = {
    'notAlphaNumeric': 'Le tag doit être alphanumerique.',
  };
  public validators = [this.notAlphaNumeric];
  @Input() tags: any;
  @Input() tagListName: string;
  @Output() tagsChange = new EventEmitter<number>();


  constructor(
      protected tagService: TagService,
  ) {
    this.tagService = tagService;
  }

  ngOnInit() {}

  public requestAutocompleteItems = (text: string): Observable<Array<String>> => {
    return this.tagService.findTags(text);
  };

  private notAlphaNumeric(control: FormControl) {

    const regex = /^[a-z0-9]+$/i;
    if (regex.exec(control.value) === null) {
      return {
        'notAlphaNumeric': true
      };
    }

    return null;
  }

  private update(): void {
    this.tagsChange.emit(this.tags);
  }


}