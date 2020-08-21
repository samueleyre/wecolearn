import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminTagDomainService } from '~/modules/tags/services/admin-tag-domain.service';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { ToastService } from '~/core/services/toast.service';

@Component({
  selector: 'app-tag-domain-form',
  templateUrl: './tag-domain-form.component.html',
  styleUrls: ['./tag-domain-form.component.scss'],
})
export class TagDomainFormComponent extends DestroyObservable implements OnInit {
  @Input() tagDomain: TagDomain;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditTagDomain = new EventEmitter();

  createEditTagDomainForm: FormGroup;
  isCreatingUpdating = false;

  constructor(private _fb: FormBuilder, private _tagService: AdminTagDomainService, private _toastr: ToastService) {
    super();
  }

  updateFormValues() {
    const tag: TagDomain = this.tagDomain;

    this.updateValidators();
    if (this.createEditTagDomainForm) {
      this.createEditTagDomainForm.setValue({
        name: tag.name,
        emoji: tag.emoji,
        hexcolor: tag.hexcolor,
      });

      Object.keys(this.createEditTagDomainForm.controls).forEach((key) => {
        this.createEditTagDomainForm.controls[key].setErrors(null);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCreating']) {
      this.updateValidators();
    }

    if (changes['tagDomain']) {
      this.updateFormValues();
    }
  }

  ngOnInit() {
    if (!this.tagDomain) {
      this.tagDomain = new TagDomain();
    }
    this.initForm();
  }

  get controls() {
    return this.createEditTagDomainForm.controls;
  }

  public onUpdateTagDomain(): void {
    this.isCreatingUpdating = true;

    const formVal = { ...this.createEditTagDomainForm.value };

    const errM = (err) => {
      if (err.status === 409) this._toastr.error('Ce domaine d\'apprentissage existe déjà');
      this.isCreatingUpdating = false;
      throw err;
    };

    if (this.isCreating) {
      this._tagService.postAndList(formVal).subscribe(
        (data) => {
          this.isCreatingUpdating = false;
          this._toastr.success(
            `Le tag ${formVal.name} a été créé`,
          );
          this.onCloseEditTagDomain.emit();
        },
        errM);
    } else {
      this._tagService.patchAndList({ ...formVal, id: this.tagDomain.id }).subscribe(
        (data) => {
          this.isCreatingUpdating = false;
          this._toastr.success(`Les informations ont bien été modifiées`);
          this.onCloseEditTagDomain.emit();
        },
        errM);
    }
  }

  updateValidators(isCreating: boolean = this.isCreating) {
    if (this.createEditTagDomainForm) {
      this.createEditTagDomainForm.controls['name'].setValidators(isCreating ? Validators.required : null);
      this.createEditTagDomainForm.controls['emoji'].setValidators(isCreating ? Validators.required : null);
      this.createEditTagDomainForm.controls['hexcolor'].setValidators(isCreating ? Validators.required : null);
    }
  }

  private initForm(
    isCreating: boolean = this.isCreating,
    tag: TagDomain = this.tagDomain,
  ): void {
    this.createEditTagDomainForm = this._fb.group({
      name: [tag.name, Validators.required],
      emoji: [tag.emoji, Validators.required],
      hexcolor: [tag.hexcolor, Validators.required],
    });

    this.updateValidators(isCreating);

    this.updateFormValues();
  }}
