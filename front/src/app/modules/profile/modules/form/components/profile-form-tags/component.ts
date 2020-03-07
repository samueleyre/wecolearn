import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { Tag } from '~/core/entities/tag/entity';
import { TagService } from '~/core/services/tag';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { alphaNumericValidator } from '~/modules/profile/modules/form/components/profile-form-tags/alphanumeric.validator';

@Component({
  selector: 'profile-form-tags',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormTagsComponent extends DestroyObservable implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() fieldName: 'know_tags' | 'learn_tags' | 'teach_tags';
  @Input() type: TagTypeEnum;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl(null, alphaNumericValidator());
  public tags: Tag[] = [];
  public filteredTags: Tag[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef;

  constructor(private _tagService: TagService) {
    super();
  }

  ngOnInit(): void {
    this.tagCtrl.valueChanges
      .pipe(
        debounceTime(300),
        tap((literal: string) => this.filterTags(literal)),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  get title(): string {
    return '';
  }

  get tagsControl(): FormControl {
    return <FormControl>this.parentForm.get(this.fieldName);
  }

  public remove(tag: Tag[]): void {
    const index = this.tagsControl.value.indexOf(tag);
    if (index >= 0) {
      const tags = [...this.tagsControl.value];
      tags.splice(index, 1);
      this.tagsControl.setValue(tags);
    }
  }

  public onTagSelect(event: MatAutocompleteSelectedEvent): void {
    const tags: Tag[] = this.tagsControl.value || [];
    tags.push(event.option.value);
    this.tagsControl.setValue(tags);
    this.tagInput.nativeElement.value = null;
    this.tagCtrl.setValue('');
  }

  private filterTags(literal: string = ''): void {
    if (literal === undefined || literal === null || literal === '' || this.tagCtrl.hasError('notAlphaNumeric')) {
      this.filteredTags = [];
      return;
    }
    this._tagService
      .findTags(literal)
      .pipe(
        // add tag of search literal if not found in DB
        map(
          tags =>
            tags.find(tag => !tag.name.includes(literal))
            || tags.length === 0 ?
              [new Tag({ id: null, name: literal, type: this.type }), ...tags]
              : tags,
        ),
        takeUntil(this.destroy$))
      .subscribe((tags: Tag[]) => {
        // don't show selected tags in list
        this.filteredTags = _.differenceWith(tags, this.tagsControl.value, (x, y: Tag) => x.name === y.name);
      });
  }
}
