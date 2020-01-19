import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DomainFormComponent } from '~/modules/domains/modules/domain-ui/components/domain-form/domain-form.component';
import { AuthenticationService } from '~/core/services/auth/auth';
import { AdminDomainService } from '~/modules/domains/services/admin-domain.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { Domain } from '~/core/entities/domain/domain';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent extends DestroyObservable implements OnInit, AfterViewInit  {
  domainsToShow: Domain[];
  domains$: BehaviorSubject<Domain[]> = new BehaviorSubject(null);
  domainsFiltered: Domain[];

  searchFilters: FormGroup;
  editDomainFormVisible = false;
  isCreatingDomain = false;
  PAGE_SIZE = 10;

  @ViewChild(DomainFormComponent, { static: false }) domainForm: DomainFormComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public editedDomain: Domain;
  canEditDomain$: Observable<boolean>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _domainService: AdminDomainService,
    private _fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to domain list
    this._domainService.domains$.pipe(takeUntil(this.destroy$)).subscribe((domains) => {
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

  showEditForm(domain: Domain = null) {
    const emptyDomain = new Domain();
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
    this._domainService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this._fb.group({
      query: [''],
    });
  }
}
