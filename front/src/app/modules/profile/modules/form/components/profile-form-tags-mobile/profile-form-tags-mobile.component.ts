import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { Tag } from '~/core/entities/tag/entity';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'app-profile-form-tags-mobile',
  templateUrl: './profile-form-tags-mobile.component.html',
  styleUrls: ['./profile-form-tags-mobile.component.scss'],
})
export class ProfileFormTagsMobileComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() fieldName: 'know_tags' | 'learn_tags' | 'teach_tags';
  @Input() type: TagTypeEnum;

  constructor(
    private _router: Router,
  ) {
  }

  ngOnInit() {
  }

  get tags(): Tag[] {
    return this.tagsControl.value;
  }

  get tagsControl(): FormControl {
    return <FormControl>this.parentForm.get(this.fieldName);
  }

  public remove(tag: Tag): void {
    const index = this.tagsControl.value.indexOf(tag);
    if (index >= 0) {
      const tags = [...this.tagsControl.value];
      tags.splice(index, 1);
      this.tagsControl.setValue(tags);
    }
  }

  private get exceptions(): number[] {
    return this.parentForm.get(this.fieldName).value.map(tag => tag.id);
  }

  public searchForTag() {
    this._router.navigate(
      [NAV.tagSearchBar],
      { queryParams: { tag_type: this.type, origin: this._router.url, exceptions: this.exceptions.join(',') } },
      );
  }
}
