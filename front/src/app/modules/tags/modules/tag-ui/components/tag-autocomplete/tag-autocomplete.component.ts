import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { Tag } from '~/core/entities/tag/entity';
import { TagService } from '~/core/services/tag/tag.service';
import { tagTypeEmoji, TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

@Component({
  selector: 'app-tag-autocomplete',
  templateUrl: './tag-autocomplete.component.html',
  styleUrls: ['./tag-autocomplete.component.scss'],
})
export class TagAutocompleteComponent extends DestroyObservable implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() exception: Tag;
  @Input() contrlKey = 'tag';

  public tagCtrl = new FormControl();
  public filteredTags: Observable<Tag[]>;
  public selectedTag: Tag;

  private focusDebounceTimer;

  constructor(private tagsService: TagService) {
    super();
  }

  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap((value) => {
        const exception = this.exception ? this.exception.type : null;
        return this.tagsService.findTags(value, exception).pipe(
            map(tags => tags.filter(tag => tag.id !== this.exception.id)));
      },
      ),
    );

    const initialTag = this.parentForm.get(this.contrlKey).value;

    if (initialTag) {
      this.tagCtrl.setValue(initialTag);
      this.selectedTag = initialTag;
    }
  }

  public onTagSelect(event: MatAutocompleteSelectedEvent) {
    clearTimeout(this.focusDebounceTimer);
    const tag = event.option.value;
    this.parentForm.get(this.contrlKey).setValue(tag);
    this.selectedTag = tag;
  }

  // show value again
  inputLostFocus() {
    clearTimeout(this.focusDebounceTimer);
    this.focusDebounceTimer = setTimeout(
      () => this.tagCtrl.setValue(this.selectedTag),
      300,
    );
  }

  toEmojiType(type: TagTypeEnum): string {
    return tagTypeEmoji[type];
  }

  displayFn(tag: Tag): string {
    return tag ? `${tag.name} ${tagTypeEmoji[tag.type]}` : '';
  }
}
