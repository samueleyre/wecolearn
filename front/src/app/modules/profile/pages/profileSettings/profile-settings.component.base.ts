import { Component, Inject, OnDestroy } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { debounceTime, filter, map, mapTo, takeUntil, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { DomainService } from '~/core/services/domain/domain';
import { ProfileService } from '~/core/services/user/profile.service';
import { ToastService } from '~/core/services/toast.service';
import { User } from '~/core/entities/user/entity';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

@Component({
  template: '',
})
export class ProfileSettingsComponentBase extends DestroyObservable {
  constructor(
    @Inject(APP_BASE_HREF) r: string,
    private domainService: DomainService,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
  ) {
    super();
  }

  public tags = [];
  public savingInput = {
    first_name: null,
    last_name: null,
    image: null,
    learn_tags: null,
    biographie: null,
    know_tags: null,
    teach_tags: null,
    intensity: null,
    slack_accounts: null,
    latitude: null,
    longitude: null,
    city: null,
  };

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    image: null,
    learn_tags: [],
    biographie: null,
    know_tags: [],
    teach_tags: [],
    intensity: 1,
    slack_accounts: [],
    latitude: null,
    longitude: null,
    city: null,
  });


  ngOnInit() {
    this.subscribeToUpdates();

    this.autoSaveChanges();

    // get newest values from api
    this.profileService.get().subscribe();
  }

  private subscribeToUpdates(): void {
    this.profileService.entity$
      .pipe(
        filter(val => !!val),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.setProfileFormData(user);
      });
  }

  private autoSaveChanges(): void {
    const textFields = [
      'first_name',
      'last_name',
      'biographie',
    ];

    const textObsList = [];
    for (const textFieldsKey of textFields) {
      textObsList.push(
        this.userForm.get(textFieldsKey).valueChanges.pipe(mapTo(textFieldsKey)),
      );
    }

    const textObs = merge(...textObsList)
      .pipe(
        tap((field:string) => this.savingInput[field] = true),
        debounceTime(3000),
      );

    const immediateFields = [
      'learn_tags',
      'know_tags',
      'teach_tags',
      'image',
    ];

    const immediateObsList = [];
    for (const immediateFieldsKey of immediateFields) {
      immediateObsList.push(
        this.userForm.get(immediateFieldsKey).valueChanges.pipe(mapTo(immediateFieldsKey)),
      );
    }

    const immediateObs = merge(...immediateObsList)
      .pipe(tap((field:string) => {
        this.savingInput[field] = true;
      }));

    const slideFields = [
      'intensity',
    ];

    const slideObsList = [];
    for (const slideFieldsKey of slideFields) {
      slideObsList.push(
        this.userForm.get(slideFieldsKey).valueChanges.pipe(mapTo(slideFieldsKey)),
      );
    }

    const slideObs = merge(...slideObsList)
      .pipe(
        tap((field:string) => this.savingInput[field] = true),
        debounceTime(2000),
      );

    const otherFields = [
      'latitude',
      'longitude',
      'city',
    ];

    const otherObsList = [];
    for (const otherFieldsKey of otherFields) {
      otherObsList.push(
        this.userForm.get(otherFieldsKey).valueChanges.pipe(mapTo(otherFieldsKey)),
      );
    }

    const otherObs = merge(...otherObsList)
      .pipe(
        tap((field:string) => this.savingInput[field] = true),
        debounceTime(2000),
      );

    // merge everything and subscribe
    merge(
      textObs,
      otherObs,
      immediateObs,
      slideObs,
    )
    .pipe(tap(val => console.log(val)))
    .pipe(
      // tap((field:string) => this.savingInput[field] = true),
      takeUntil(this.destroy$),
    )
    .subscribe((val) => {
      this.submit();
    });
  }

  get loaded() {
    return this.profileService.entity;
  }

  setProfileFormData(user: User) {
    this.userForm.patchValue(user, { emitEvent: false });
    this.setTags(user);
  }

  setTags(user: User) {
    this.userForm.controls.learn_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 0), { emitEvent: false });
    this.userForm.controls.know_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 1), { emitEvent: false });
    this.userForm.controls.teach_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 2), { emitEvent: false });
  }

  submit() {
    this.joinTags();
    this.profileService.patch({ tags: this.tags, ...this.userForm.value }).subscribe(
      (user: User) => {
        this.resetSavingInput();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  private resetSavingInput():void {
    for (const key of Object.keys(this.savingInput)) {
      if (this.savingInput[key] === true) {
        this.savingInput[key] = false;
      }
    }
  }

  joinTags() {
    this.tags = [
      ...this.userForm.value.learn_tags,
      ...this.userForm.value.know_tags,
      ...this.userForm.value.teach_tags,
    ];
  }

  get learnType(): TagTypeEnum {
    return TagTypeEnum.LEARN;
  }

  get teachType(): TagTypeEnum {
    return TagTypeEnum.TEACH;
  }

  get knowType(): TagTypeEnum {
    return TagTypeEnum.KNOW;
  }
}
