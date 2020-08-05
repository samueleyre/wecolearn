import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminDomainService } from '~/modules/domains/services/admin-domain.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { Domain } from '~/core/entities/domain/domain';
import { ToastService } from '~/core/services/toast.service';


@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss'],
})
export class DomainFormComponent extends DestroyObservable implements OnInit {
  @Input() domain: Domain;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditDomain: EventEmitter<Domain> = new EventEmitter<Domain>();

  createEditDomainForm: FormGroup;
  isCreatingUpdating = false;

  constructor(private _fb: FormBuilder, private _domainService: AdminDomainService, private _toastr: ToastService) {
    super();
  }

  updateFormValues() {
    const domain: Domain = this.domain;

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
      this.domain = new Domain();
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
      if (err.status === 409) this._toastr.error('Ce nom de domaine est déjà utilisé');
      this.isCreatingUpdating = false;
      throw err;
    };

    if (this.isCreating) {
      this._domainService.createAndList(formVal).subscribe(
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
      this._domainService.patchAndList({ ...formVal, id: this.domain.id }).subscribe(
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
    domain: Domain = this.domain,
  ): void {
    this.createEditDomainForm = this._fb.group({
      name: [domain.name, Validators.required],
    });

    this.updateFormValues();
  }
}
