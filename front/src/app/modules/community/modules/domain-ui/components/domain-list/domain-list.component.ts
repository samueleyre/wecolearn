import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { CommunityEntity } from '~/core/entities/community/community.entity';
import { ToastService } from '~/core/services/toast.service';
import { AdminCommunityService } from '~/core/services/admin/admin-community.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss'],
})
export class DomainListComponent extends DestroyObservable implements OnInit {
  @Input() domains: CommunityEntity[] = [];
  @Input() canEditDomain = false;
  @Output() editDomain = new EventEmitter<CommunityEntity>();

  displayedColumns: string[] = ['name', 'count', 'communityAdmins', 'actions'];

  constructor(
    private _communityService: AdminCommunityService,
    private _toastr: ToastService,
    private _dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onDelete(domain: CommunityEntity) {
    this._dialogService
      .confirm('Domains', 'Voulez-vous supprimer cette communauté ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this._communityService
            .deleteAndList(domain.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this._toastr.success(`La communauté ${domain.name} a été supprimé`);
              },
              (err) => {
                this._toastr.error(err.message);
              },
            );
        }
      });
  }

  public onEdit(domain: CommunityEntity) {
    this.editDomain.emit(domain);
  }
}
