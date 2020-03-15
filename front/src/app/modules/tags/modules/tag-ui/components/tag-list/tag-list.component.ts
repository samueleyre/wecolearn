import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { Tag } from '~/core/entities/tag/entity';
import { AdminTagService } from '~/modules/tags/services/admin-tag.service';
import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagTypeEnum, tagTypeFR } from '~/core/enums/tag/tag-type.enum';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent extends DestroyObservable implements OnInit {
  @Input() tags: Tag[] = [];
  @Input() canEditTag = false;
  @Output() editTag = new EventEmitter<Tag>();

  displayedColumns: string[] = ['name', 'type', 'iteration', 'actions'];

  constructor(
    public tagService: AdminTagService,
    private _toastr: ToastrService,
    private _dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  toFrenchType(type: TagTypeEnum): string {
    return tagTypeFR[type];
  }

  tagDisplayName(tag: Tag): string {
    return `${tag.name} ${tag.tag_domain ? tag.tag_domain.emoji : ''}`.trim();
  }

  onDelete(tag: Tag) {
    this._dialogService
      .confirm('Tags', 'Voulez-vous supprimer ce tag ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.tagService
            .deleteAndList(tag.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this._toastr.success(`Le tag ${tag.name} a été supprimé`);
              },
              (err) => {
                this._toastr.error(err.message);
              },
            );
        }
      });
  }

  public onEdit(tag: Tag) {
    this.editTag.emit(tag);
  }
}
