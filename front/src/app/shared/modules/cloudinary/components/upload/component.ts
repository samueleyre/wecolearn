import {
  Component,
  Input,
  EventEmitter,
  Injectable,
  Output, OnInit,
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { HeaderBag } from '~/core/services/auth/headerBag';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'upload',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
})export class UploadComponent implements OnInit{
  public uploader: FileUploader;

  @Output()
  public complete: EventEmitter<any> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();

  @Output()
  public error: EventEmitter<any> = new EventEmitter();

  @Input() url;

  constructor() {}

  ngOnInit() {
    this.uploader = new FileUploader(
      {
        url: environment.origin + this.url,
        headers: HeaderBag.get(),
      });

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.complete.emit(JSON.parse(response));
    };

    this.uploader.onErrorItem = (item: any, response: any, status: number, headers: any) => {
      console.log('error', status, item, response, headers);
      this.error.emit();
    };
  }

  onCancel() {
    this.cancel.emit();
  }
}
