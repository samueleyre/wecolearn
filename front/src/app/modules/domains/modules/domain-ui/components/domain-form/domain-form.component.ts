import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { Community } from '~/core/entities/domain/community';
import { ToastService } from '~/core/services/toast.service';
import { AdminCommunityService } from '~/core/services/admin/admin-community.service';
import { CommunityAdminUsersService } from '~/core/services/communityAdmin/community-admin-users.service';
import { User } from '~/core/entities/user/entity';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';


@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss'],
})
export class DomainFormComponent extends DestroyObservable implements OnInit {
  @Input() domain: Community;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;
  usersInCommunity$: BehaviorSubject<User[]> = new BehaviorSubject(null);

  @Output() onCloseEditDomain: EventEmitter<Community> = new EventEmitter<Community>();

  createEditDomainForm: FormGroup;
  isCreatingUpdating = false;

  constructor(
    private _fb: FormBuilder,
    private _communityService: AdminCommunityService,
    private _userService: AdminUsersService,
    private _toastr: ToastService,
  ) {
    super();
  }

  updateFormValues() {
    const domain: Community = this.domain;

    if (this.createEditDomainForm) {
      this.createEditDomainForm.setValue({
        name: domain.name,
        community_admins: domain.community_admins,
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
    this._userService.users$.pipe(
      tap(users => console.log({ users })),
      takeUntil(this.destroy$),
    ).subscribe((users) => {
      this.usersInCommunity$.next(users);
    });
    this.loadUsers();

    if (!this.domain) {
      this.domain = new Community();
    }
    this.initForm();
  }

  private loadUsers() {
    const filter = this.domain && this.domain.id ? { domain_id: this.domain.id } : {};
    this._userService.list(
      {
        ...filter,
        onlyAdmin: true,
      },
    ).subscribe();
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
      community_admins: [domain.community_admins, Validators.required],
    });

    this.updateFormValues();
  }

  compareIds(tagOption: { id: number }, tagSelection: { id: number }): boolean {
    return tagOption && tagSelection ? tagOption.id === tagSelection.id : tagOption === tagSelection;
  }
}
