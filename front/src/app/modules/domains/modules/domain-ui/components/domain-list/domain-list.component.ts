import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { Domain } from '~/core/entities/domain/domain';
import { AdminDomainService } from '~/modules/domains/services/admin-domain.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss'],
})
export class DomainListComponent extends DestroyObservable implements OnInit {
  @Input() domains: Domain[] = [];
  @Input() canEditDomain = false;
  @Output() editDomain = new EventEmitter<Domain>();

  displayedColumns: string[] = ['name', 'count'];

  constructor(
    private _domainService: AdminDomainService,
    private _toastr: ToastrService,
    private _dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onDelete(domain: Domain) {
    this._dialogService
      .confirm('Domains', 'Voulez-vous supprimer ce domaine ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this._domainService
            .deleteAndList(domain.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this._toastr.success(`Le domaine ${domain.name} a été supprimé`);
              },
              (err) => {
                this._toastr.error(err.message);
              },
            );
        }
      });
  }

  public onEdit(domain: Domain) {
    this.editDomain.emit(domain);
  }
}
