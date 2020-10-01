import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { TagDomainsService } from '~/core/services/tag/tag-domains.service';

@Component({
  selector: 'app-tag-domain-autocomplete',
  templateUrl: './tag-domain-autocomplete.component.html',
  styleUrls: ['./tag-domain-autocomplete.component.scss'],
})
export class TagDomainAutocompleteComponent extends DestroyObservable implements OnInit {
  @Input() parentForm: FormGroup;

  public tagDomainCtrl = new FormControl();
  public filteredTagDomains: Observable<TagDomain[]>;
  public selectedTagDomain: TagDomain;

  private focusDebounceTimer;

  constructor(private tagDomainsService: TagDomainsService) {
    super();
  }

  ngOnInit() {
    this.filteredTagDomains = this.tagDomainCtrl.valueChanges.pipe(
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this.tagDomainsService.findTagDomains(value)),
    );

    const initialTagDomain = this.parentForm.get('tag_domains').value; // todo: fix

    if (initialTagDomain) {
      this.tagDomainCtrl.setValue(initialTagDomain);
      this.selectedTagDomain = initialTagDomain;
    }
  }

  public onTagDomainSelect(event: MatAutocompleteSelectedEvent) {
    clearTimeout(this.focusDebounceTimer);
    const tagDomain = event.option.value;
    this.parentForm.get('tag_domain').setValue(tagDomain); // todo: fix
    this.selectedTagDomain = tagDomain;
  }

  // show value again
  inputLostFocus() {
    clearTimeout(this.focusDebounceTimer);
    this.focusDebounceTimer = setTimeout(
      () => this.tagDomainCtrl.setValue(this.selectedTagDomain),
      300,
    );
  }

  displayFn(tagDomain: TagDomain): string {
    return tagDomain ? tagDomain.name : '';
  }
}
