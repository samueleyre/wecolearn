import {
  Component,
  Input,
  EventEmitter,
  Injectable,
  Output,
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { HeaderBag } from '~/shared/services/auth/headerBag';

import { environment } from '~/../environments/environment';

@Component({
  selector: 'upload',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
})

@Injectable()
export class UploadComponent {
  public uploader: FileUploader;
  public _filename = 'filename';

  private emitter: EventEmitter<string> = new EventEmitter();

  @Output()
  public complete: EventEmitter<any> = new EventEmitter();

  @Output()
  public error: EventEmitter<any> = new EventEmitter();


  constructor() {
    //
  }

  @Input()
  set url(url: string) {
    this.emitter.subscribe((filename: string) => {
      this.uploader = new FileUploader(
        {
          url: environment.origin + url,
          headers: HeaderBag.get(),
        });

      this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
        // console.log( response );
        this.complete.emit({ status, response: JSON.parse(response) });
      };
      this.uploader.onCompleteItem = (item: any, response: any, status: number, headers: any) => {
        // console.log( "complete", status, item, response, headers );
        // this.error.emit( status );
      };

      this.uploader.onErrorItem = (item: any, response: any, status: number, headers: any) => {
        // console.log( "error", status, item, response, headers );
        this.error.emit();
      };
      // console.log( 'headers', this.uploader.options.headers);
    });
  }

  @Input()
  set filename(name: string) {
    this._filename = name;
    this.emitter.emit(name);
  }

  cancel() {
    this.complete.emit();
  }
}
