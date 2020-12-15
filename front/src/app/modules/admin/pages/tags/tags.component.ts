import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Tag } from '~/core/entities/tag/entity';
import { TagFormComponent } from '~/modules/tags/modules/tag-ui/components/tag-form/tag-form.component';
import { AuthenticationService } from '~/core/services/auth/auth';
import { AdminTagService } from '~/modules/tags/services/admin-tag.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagTypeEnum, tagTypeFR } from '~/core/enums/tag/tag-type.enum';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent extends DestroyObservable implements OnInit, AfterViewInit {
  tagsToShow: Tag[];
  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject(null);
  tagsFiltered: Tag[];

  searchFilters: FormGroup;
  editTagFormVisible = false;
  isCreatingTag = false;
  PAGE_SIZE = 10;

  @ViewChild(TagFormComponent, { static: false }) tagForm: TagFormComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public editedTag: Tag;
  canEditTag$: Observable<boolean>;

  constructor(
    public authenticationService: AuthenticationService,
    public tagService: AdminTagService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to tag list
    this.tagService.tags$.pipe(takeUntil(this.destroy$)).subscribe((tags) => {
      this.tags$.next(tags);
    });
    this.loadTags();
    this.initSearchForm();
  }

  ngAfterViewInit() {
    merge(
      this.tags$,
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
          this.closeTagForm();
          const query = this.searchFilters ? this.searchFilters.controls.query.value : '';
          const type = this.searchFilters ? Number(this.searchFilters.controls.type.value) : null;
          const page = this.paginator.pageIndex;
          const start = Number(page) * this.PAGE_SIZE;
          const end = Number(page) * this.PAGE_SIZE + this.PAGE_SIZE;
          this.tagsFiltered = this.tags.filter(
            t => `${t.name} ${t.tag_domains.map(td => t.name).join(' ')}`.toLowerCase()
              .includes(query.toLowerCase()),
          ).filter(
            t => type === null || t.type === type,
          ).filter(
            t => !this.searchFilters.controls.hasDomain.value || t.tag_domains.length === 0,
          );
          return of(this.tagsFiltered.slice(start, end));
        }),
      )
      .subscribe((filteredTags) => {
        this.tagsToShow = filteredTags;
      });
  }

  get tags(): Tag[] {
    return this.tags$.value;
  }

  get toOrder(): number {
    return this.tags.filter(t => t.tag_domains.length === 0).length;
  }

  get loaded(): boolean {
    return !!this.tags;
  }

  get countTags(): number {
    return this.tagsFiltered && this.tagsFiltered.length;
  }

  toFrenchType(type: TagTypeEnum): string {
    return tagTypeFR[type];
  }

  showEditForm(tag: Tag = null) {
    const emptyTag = new Tag();
    this.editedTag =
      tag === null
        ? emptyTag
        : tag;

    this.isCreatingTag = !this.editedTag.id;
    this.editTagFormVisible = true;
  }

  closeTagForm() {
    this.editTagFormVisible = false;
  }

  private loadTags() {
    this.tagService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this.fb.group({
      query: [''],
      type: [0],
      hasDomain: [false],
    });
  }
}
