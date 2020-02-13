import {
  Component,
  OnInit,
  Injectable, Input, Output, EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { TagService } from '~/core/services/tag';


@Component({
  selector: 'app-taginput',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileTagInputComponent implements OnInit {
  public errorMessages = {
    notAlphaNumeric: 'Le domaine doit être alphanumerique.',
  };
  public validators = [this.notAlphaNumeric];
  @Input() tags: any;
  @Input() tagListName: string;
  @Input() type: number;
  @Output() tagsChange = new EventEmitter<number>();


  constructor(
      protected tagService: TagService,
  ) {
    this.tagService = tagService;
  }

  ngOnInit() {
//
  }

  public requestAutocompleteItems = (text: string): Observable<String[]> => this.tagService.findTags(text);

  private notAlphaNumeric(control: FormControl) {
    const regex = /^[a-zA-Z0-9 \u00C0-\u024F\u1E00-\u1EFF']+$/i;
    if (regex.exec(control.value) === null) {
      return {
        notAlphaNumeric: true,
      };
    }

    return null;
  }

  public update(): void {
    this.tags = this.tags.map((tag: any) => { // tslint:disable-line
      return {
        id: tag.id ? tag.id : null,
        name: tag.name ? tag.name : null,
        type: tag.type ? tag.type : this.type,
      };
    });
    this.tagsChange.emit(this.tags);
  }
}
