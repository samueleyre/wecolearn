import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { Community } from '~/core/entities/domain/community';
import { ToastService } from '~/core/services/toast.service';
import {AdminCommunityService} from '~/core/services/admin/admin-community.service';


@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss'],
})
export class DomainFormComponent extends DestroyObservable implements OnInit {
  @Input() domain: Community;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditDomain: EventEmitter<Community> = new EventEmitter<Community>();

  createEditDomainForm: FormGroup;
  isCreatingUpdating = false;

  constructor(private _fb: FormBuilder, private _communityService: AdminCommunityService, private _toastr: ToastService) {
    super();
  }

  updateFormValues() {
    const domain: Community = this.domain;

    if (this.createEditDomainForm) {
      this.createEditDomainForm.setValue({
        name: domain.name,
      });

      Object.keys(this.createEditDomainForm.controls).forEach((key) => {
        this.createEditDomainForm.controls[key].setErrors(null);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['domain']) {
      this.updateFormValues();
    }
  }

  ngOnInit() {
    if (!this.domain) {
      this.domain = new Community();
    }
    this.initForm();
  }

  get controls() {
    return this.createEditDomainForm.controls;
  }

  public onUpdateDomain(): void {
    this.isCreatingUpdating = true;

    const formVal = { ...this.createEditDomainForm.value };

    if (!this.isCreating) {
      delete formVal.roles;
    }

    const errM = (err) => {
      if (err.status === 409) this._toastr.error('Ce nom de communauté est déjà utilisé');
      this.isCreatingUpdating = false;
      throw err;
    };

    if (this.isCreating) {
      this._communityService.createAndList(formVal).subscribe(
        (data) => {
          const domain = data[0];
          this.isCreatingUpdating = false;
          this._toastr.success(
            `Le domaine ${domain.name} a été créé`,
          );
          this.onCloseEditDomain.emit(domain);
        },
        errM);
    } else {
      this._communityService.patchAndList({ ...formVal, id: this.domain.id }).subscribe(
        (data) => {
          const domain = data[0];
          this.isCreatingUpdating = false;
          this._toastr.success(`Les informations ont bien été modifiées`);
          this.onCloseEditDomain.emit(domain);
        },
        errM);
    }
  }

  private initForm(
    isCreating: boolean = this.isCreating,
    domain: Community = this.domain,
  ): void {
    this.createEditDomainForm = this._fb.group({
      name: [domain.name, Validators.required],
    });

    this.updateFormValues();
  }
}
