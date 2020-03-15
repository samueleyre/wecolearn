import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { AdminTagDomainService } from '~/modules/tags/services/admin-tag-domain.service';
import { TagDomain } from '~/core/entities/tag/TagDomain';

@Component({
  selector: 'app-tag-domain-list',
  templateUrl: './tag-domain-list.component.html',
  styleUrls: ['./tag-domain-list.component.scss'],
})
export class TagDomainListComponent extends DestroyObservable implements OnInit {
  @Input() tagDomains:TagDomain[] = [];
  @Input() canEditTagDomain = false;
  @Output() editTagDomain = new EventEmitter<TagDomain>();

  displayedColumns: string[] = ['name', 'emoji', 'actions'];

  constructor(
    public tagService: AdminTagDomainService,
    private _toastr: ToastrService,
    private _dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  onDelete(tag: TagDomain) {
    this._dialogService
      .confirm('TagDomains', 'Voulez-vous supprimer ce domaine ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.tagService
            .deleteAndList(tag.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this._toastr.success(`Le domaine ${tag.name} a été supprimé`);
              },
              (err) => {
                this._toastr.error(err.message);
              },
            );
        }
      });
  }

  public onEdit(tag: TagDomain) {
    this.editTagDomain.emit(tag);
  }
}
