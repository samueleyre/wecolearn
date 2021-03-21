import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Image } from '~/core/entities/image/entity';
import { ToastService } from '~/core/services/toast.service';

@Component({
  selector: 'app-upload-form-image',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class UploadFormImageComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() url;

  editing = false;

  constructor(
    private _toastr: ToastService,
  ) {
  }

  ngOnInit(): void {
    //
  }

  onComplete(response: { id?: number, image: Image }) {
    this.parentForm.get('image').setValue(response.image);
    this.editing = false;
  }

  onError(status: number) {
    this._toastr.error('Une erreur est survenu lors de téléversement, essayer une image plus petite !');
  }
}
