import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { TagDomainFormComponent } from '~/modules/tags/modules/tag-domain-ui/components/tag-domain-form/tag-domain-form.component';
import { AdminTagDomainService } from '~/modules/tags/services/admin-tag-domain.service';

@Component({
  selector: 'app-tag-domains',
  templateUrl: './tag-domains.component.html',
  styleUrls: ['./tag-domains.component.scss'],
})
export class TagDomainsComponent extends DestroyObservable implements OnInit {
  tagDomainsToShow: TagDomain[];
  tagDomains$: BehaviorSubject<TagDomain[]> = new BehaviorSubject(null);
  tagDomainsFiltered: TagDomain[];

  searchFilters: FormGroup;
  editTagDomainFormVisible = false;
  isCreatingTagDomain = false;
  PAGE_SIZE = 10;

  @ViewChild(TagDomainFormComponent, { static: false }) tagForm: TagDomainFormComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public editedTagDomain: TagDomain;
  public canEditTagDomain$: Observable<boolean>;

  constructor(
    public authenticationService: AuthenticationService,
    public tagDomainService: AdminTagDomainService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to tag list
    this.tagDomainService.tags$.pipe(takeUntil(this.destroy$)).subscribe((tags) => {
      this.tagDomains$.next(tags);
    });
    this.loadTagDomains();
    this.initSearchForm();
  }

  ngAfterViewInit() {
    merge(
      this.tagDomains$,
      this.searchFilters.valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.paginator.pageIndex = 0)),
      ),
      this.paginator.page,
    )
      .pipe(
        filter(() => !!this.tags), // skip if tags is not defined yet
        distinctUntilChanged(),
        switchMap(() => {
          this.closeTagDomainForm();
          const query = this.searchFilters ? this.searchFilters.controls.query.value : '';
          const page = this.paginator.pageIndex;
          const start = Number(page) * this.PAGE_SIZE;
          const end = Number(page) * this.PAGE_SIZE + this.PAGE_SIZE;
          this.tagDomainsFiltered = this.tags.filter(
            t => `${t.name} ${t.emoji}`.toLowerCase().includes(query.toLowerCase()),
          );
          return of(this.tagDomainsFiltered.slice(start, end));
        }),
      )
      .subscribe((filteredTagDomains) => {
        this.tagDomainsToShow = filteredTagDomains;
      });
  }

  get tags() {
    return this.tagDomains$.value;
  }

  get loaded(): boolean {
    return !!this.tags;
  }

  get countTagDomains(): number {
    return this.tagDomainsFiltered && this.tagDomainsFiltered.length;
  }

  showEditForm(tag: TagDomain = null) {
    this.editedTagDomain = tag;
    this.isCreatingTagDomain = !tag || !tag.id;
    this.editTagDomainFormVisible = true;
  }

  closeTagDomainForm() {
    this.editTagDomainFormVisible = false;
  }

  private loadTagDomains() {
    this.tagDomainService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this.fb.group({
      query: [''],
    });
  }
}
