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
        <span class="glyphicon glyphicon-upload"></span>Téléverser
    </button>
  `
})

@Injectable()
export class UploadComponent {
  
  public uploader:FileUploader;
  
  private emitter:EventEmitter<string> = new EventEmitter();

  @Output()
  public complete:EventEmitter<any> = new EventEmitter();


  constructor( protected headerBag : HeaderBag ) {}
  
  @Input()
  set url( url : string ) {
    this.emitter.subscribe( (filename: string ) => {
      this.uploader = new FileUploader(
          {
              url: environment.origin + url + '?filename='+filename,
              headers : this.headerBag.get([]),
          });

      this.uploader.onSuccessItem = (item:any, response:any, status:any, headers:any) => {
        console.log( response );
        this.complete.emit( JSON.parse(response) );
      }

        //console.log( 'headers', this.uploader.options.headers);  
    })
  }

  @Input() 
  set filename(name : string ){
    this.emitter.emit( name);
  }  
}