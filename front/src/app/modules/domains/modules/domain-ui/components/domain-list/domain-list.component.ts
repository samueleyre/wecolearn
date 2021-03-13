import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { Community } from '~/core/entities/domain/community';
import { ToastService } from '~/core/services/toast.service';
import {AdminCommunityService} from '~/core/services/admin/admin-community.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss'],
})
export class DomainListComponent extends DestroyObservable implements OnInit {
  @Input() domains: Community[] = [];
  @Input() canEditDomain = false;
  @Output() editDomain = new EventEmitter<Community>();

  displayedColumns: string[] = ['name', 'count'];

  constructor(
    private _communityService: AdminCommunityService,
    private _toastr: ToastService,
    private _dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onDelete(domain: Community) {
    this._dialogService
      .confirm('Domains', 'Voulez-vous supprimer ce domaine ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this._communityService
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

  public onEdit(domain: Community) {
    this.editDomain.emit(domain);
  }
}
