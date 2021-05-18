import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { CommunityAdminService } from '~/core/services/communityAdmin/community-admin.service';
import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { ToastService } from '~/core/services/toast.service';

@Component({
  selector: 'app-admin-community-settings',
  templateUrl: './admin-community-settings.component.html',
  styleUrls: ['./admin-community-settings.component.scss'],
})
export class AdminCommunitySettingsComponent extends DestroyObservable implements OnInit {
  constructor(
    private _communityAdminService: CommunityAdminService,
    private _fb: FormBuilder,
    private _dialogService: DialogService,
    private _toastr: ToastService,
  ) {
    super();
  }

  communityForm = this._fb.group(
    {
      image: null,
      name: null,
      link: null,
    },
  );

  ngOnInit() {
    this._communityAdminService.community$.subscribe(
      (community) => {
        this.communityForm.get('image').setValue(community.image);
        this.communityForm.get('name').setValue(community.name);
        this.communityForm.get('link').setValue(community.inviteToken ? community.inviteToken.token : null);
      },
    );
    this._communityAdminService.get().subscribe();
  }

  get loaded() {
    return this._communityAdminService.loaded;
  }

  get communityNameControl(): FormControl {
    return <FormControl>this.communityForm.get('name');
  }

  changeName() {
    this._dialogService
      .confirm('Changement de Nom', 'Etes-vous sûr de vouloir changer le nom de la communauté ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.updateName();
        }
      });
  }

  get hasLink(): boolean {
    return !!this.communityForm.get('link').value;
  }

  changeNewInviteLink() {
    this._communityAdminService.generateNewInviteToken().subscribe(
      () => {
        this._toastr.success('Un nouveau token a été généré');
      },
      () => {

      },
    );
  }

  updateName() {
    this._communityAdminService.put({ name: this.communityNameControl.value }).subscribe(
      () => {
        this._toastr.success('Changement du nom effectué !');
      },
      () => {

      },
    );
  }
}
