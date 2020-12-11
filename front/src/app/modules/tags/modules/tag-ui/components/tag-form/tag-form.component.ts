import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Tag } from '~/core/entities/tag/entity';
import { AdminTagService } from '~/modules/tags/services/admin-tag.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagTypeEnum, tagTypeFR, tagTypes } from '~/core/enums/tag/tag-type.enum';
import { ToastService } from '~/core/services/toast.service';
import { TagDomainsService } from '~/core/services/tag/tag-domains.service';
import { TagDomain } from '~/core/entities/tag/TagDomain';


@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss'],
})
export class TagFormComponent extends DestroyObservable implements OnInit {
  @Input() tag: Tag;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditTag = new EventEmitter();

  loaded = false;
  createEditTagForm: FormGroup;
  isCreatingUpdating = false;
  types = tagTypes;

  constructor(
    private _fb: FormBuilder,
    private _tagService: AdminTagService,
    private _toastr: ToastService,
    private _tagDomainsService: TagDomainsService,
  ) {
    super();
  }

  updateFormValues() {
    const tag: Tag = this.tag;

    this.updateValidators();
    if (this.createEditTagForm) {
      this.createEditTagForm.setValue({
        name: tag.name,
        type: tag.type,
        iteration: tag.iteration,
        tag_domains: tag.tag_domains,
      });

      Object.keys(this.createEditTagForm.controls).forEach((key) => {
        this.createEditTagForm.controls[key].setErrors(null);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCreating']) {
      this.updateValidators();
    }

    if (changes['tag']) {
      this.updateFormValues();
    }
  }

  ngOnInit() {
    this._tagDomainsService.list().subscribe((
      () => {
        this.loaded = true;
        this.initForm();
      }
    ));
    if (!this.tag) {
      this.tag = new Tag();
    }
  }

  get tagDomains$(): Observable<TagDomain[]> {
    return this._tagDomainsService.tagDomains$;
  }

  get tagDomains(): TagDomain[] {
    return this._tagDomainsService.entities;
  }

  comparer(o1: TagDomain, o2: TagDomain): boolean {
    // if possible compare by object's id property - and not by reference.
    return o1 && o2 ? o1.id === o2.id : true;
  }

  get controls() {
    return this.createEditTagForm.controls;
  }

  toFrenchType(type: TagTypeEnum): string {
    return tagTypeFR[type];
  }

  public onUpdateTag(): void {
    this.isCreatingUpdating = true;

    const formVal = { ...this.createEditTagForm.value };

    if (!this.isCreating) {
      delete formVal.type;
    }

    const errM = (err) => {
      if (err.status === 409) this._toastr.error('Ce nom de tag existe déjà');
      this.isCreatingUpdating = false;
      throw err;
    };

    if (this.isCreating) {
      this._tagService.createAndList(formVal).subscribe(
        (data) => {
          this.isCreatingUpdating = false;
          this._toastr.success(
            `Le tag ${formVal.name} a été créé`,
          );
          this.onCloseEditTag.emit();
        },
        errM);
    } else {
      this._tagService.patchAndList({ ...formVal, id: this.tag.id }).subscribe(
        (data) => {
          this.isCreatingUpdating = false;
          this._toastr.success(`Les informations ont bien été modifiées`);
          this.onCloseEditTag.emit();
        },
        errM);
    }
  }

  updateValidators(isCreating: boolean = this.isCreating) {
    if (this.createEditTagForm) {
      this.createEditTagForm.controls['name'].setValidators(isCreating ? Validators.required : null);
      this.createEditTagForm.controls['type'].setValidators(isCreating ? Validators.required : null);
      this.createEditTagForm.controls['iteration'].setValidators(isCreating ? null : Validators.required);
    }
  }

  private initForm(
    isCreating: boolean = this.isCreating,
    tag: Tag = this.tag,
  ): void {
    this.createEditTagForm = this._fb.group({
      name: [tag.name, Validators.required],
      iteration: [tag.iteration, Validators.required],
      tag_domains: [tag.tag_domains],
      type: [tag.type, Validators.required],
    });

    this.updateValidators(isCreating);

    this.updateFormValues();
  }
}
