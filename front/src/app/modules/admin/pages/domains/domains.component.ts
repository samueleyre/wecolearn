import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DomainFormComponent } from '~/modules/community/modules/domain-ui/components/domain-form/domain-form.component';
import { AuthenticationService } from '~/core/services/auth/auth.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { CommunityEntity } from '~/core/entities/community/community.entity';
import {AdminCommunityService} from '~/core/services/admin/admin-community.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent extends DestroyObservable implements OnInit, AfterViewInit  {
  domainsToShow: CommunityEntity[];
  domains$: BehaviorSubject<CommunityEntity[]> = new BehaviorSubject(null);
  domainsFiltered: CommunityEntity[];

  searchFilters: FormGroup;
  editDomainFormVisible = false;
  isCreatingDomain = false;
  PAGE_SIZE = 10;

  @ViewChild(DomainFormComponent, { static: false }) domainForm: DomainFormComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public editedDomain: CommunityEntity;
  canEditDomain$: Observable<boolean>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _communityService: AdminCommunityService,
    private _fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to domain list
    this._communityService.communities$.pipe(takeUntil(this.destroy$)).subscribe((domains) => {
      this.domains$.next(domains);
    });
    this.loadDomains();
    this.initSearchForm();
  }

  ngAfterViewInit() {
    merge(
      this.domains$,
      this.searchFilters.valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.paginator.pageIndex = 0)),
      ),
      this.paginator.page,
    )
      .pipe(
        filter(() => !!this.domains), // skip if domains is not defined yet
        distinctUntilChanged(),
        switchMap(() => {
          this.closeDomainForm();
          const query = this.searchFilters ? this.searchFilters.controls.query.value : '';
          const page = this.paginator.pageIndex;
          const start = Number(page) * this.PAGE_SIZE;
          const end = Number(page) * this.PAGE_SIZE + this.PAGE_SIZE;
          this.domainsFiltered = this.domains.filter(
            t => `${t.name}`.toLowerCase().includes(query.toLowerCase()),
          );
          return of(this.domainsFiltered.slice(start, end));
        }),
      )
      .subscribe((filteredDomains) => {
        this.domainsToShow = filteredDomains;
      });
  }

  get domains() {
    return this.domains$.value;
  }

  get loaded(): boolean {
    return !!this.domains;
  }

  get countDomains(): number {
    return this.domainsFiltered && this.domainsFiltered.length;
  }

  showEditForm(domain: CommunityEntity = null) {
    const emptyDomain = new CommunityEntity();
    this.editedDomain =
      domain === null
        ? emptyDomain
        : domain;

    this.isCreatingDomain = !this.editedDomain.id;
    this.editDomainFormVisible = true;
  }

  closeDomainForm() {
    this.editDomainFormVisible = false;
  }

  private loadDomains() {
    this._communityService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this._fb.group({
      query: [''],
    });
  }
}
