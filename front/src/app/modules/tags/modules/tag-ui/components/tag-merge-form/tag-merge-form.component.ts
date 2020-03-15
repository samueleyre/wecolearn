import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AdminTagService } from '~/modules/tags/services/admin-tag.service';
import { Tag } from '~/core/entities/tag/entity';

@Component({
  selector: 'app-tag-merge-form',
  templateUrl: './tag-merge-form.component.html',
  styleUrls: ['./tag-merge-form.component.scss'],
})
export class TagMergeFormComponent implements OnInit {
  public tagMergeForm: FormGroup;
  @Input() tag: Tag;

  @Output() onCloseEditTag = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _tagService: AdminTagService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.tagMergeForm = this._fb.group({
      mergedTag: [null, Validators.required],
    });
  }

  public onFuseTag(): void {
    const formVal = this.tagMergeForm.getRawValue();

    if (this.tag.type !== formVal.mergedTag.type) {
      this._toastr.error('les apprentissages doivent être de même type ! 📚 🧠 👩‍🏫');
      return;
    }

    this._tagService.mergeAndList(this.tag, formVal.mergedTag).subscribe(
      (data) => {
        this._toastr.success(`Les informations ont bien été modifiées`);
        this.onCloseEditTag.emit();
      },
    );
  }
}
