import { Component, 
    Input, 
    EventEmitter, 
    Injectable, 
    Output }                  from '@angular/core';
import { FileUploader }       from 'ng2-file-upload';
import { environment }        from './../config/environment';
import { HeaderBag }          from './../interceptor/header-bag';

@Component({
  selector: 'upload',
  template: `
    <input type="file" name="{{ filename }}" ng2FileSelect [uploader]="uploader" />
    <div class="progress" style="">
         <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
    </div>
    <button type="button" class="btn btn-success btn-s"
        (click)="uploader.uploadAll()" 
        [disabled]="!uploader.getNotUploadedItems().length">
        <i class="fa fa-upload" aria-hidden="true"></i> Uploader
    </button>
  `
})

@Injectable()
export class UploadComponent {
  
  public uploader:FileUploader;
  
  private emitter:EventEmitter<string> = new EventEmitter();

  @Output()
  public complete:EventEmitter<any> = new EventEmitter();

  @Output()
  public error:EventEmitter<any> = new EventEmitter();


  constructor( protected headerBag : HeaderBag ) {
  }

  @Input()
  set url( url : string ) {
      this.emitter.subscribe( (filename: string ) => {
          this.uploader = new FileUploader(
              {
                  url: environment.origin + url,
                  headers : this.headerBag.get([]),
              });

          this.uploader.onSuccessItem = (item:any, response:any, status:any, headers:any) => {
              // console.log( response );
              this.complete.emit( {response : JSON.parse(response), status : status });
          };
          this.uploader.onCompleteItem = (item:any, response:any, status:number, headers:any) => {
              // console.log( "complete", status, item, response, headers );
              // this.error.emit( status );
          };

          this.uploader.onErrorItem = (item:any, response:any, status:number, headers:any) => {
              // console.log( "error", status, item, response, headers );
              this.error.emit();
          };
          //console.log( 'headers', this.uploader.options.headers);
      })
  }


  @Input() 
  set filename(name : string ){
    this.emitter.emit( name);
  }  
}