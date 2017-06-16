import { Component, Input }   from '@angular/core';
import { FileUploader }       from 'ng2-file-upload';


@Component({
  selector: 'upload',
  template: `
    <input type="file" name="ficher" ng2FileSelect [uploader]="uploader" />
    <div class="progress" style="">
         <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
    </div>
    <button type="button" class="btn btn-success btn-s"
        (click)="uploader.uploadAll()" 
        [disabled]="!uploader.getNotUploadedItems().length">
        <span class="glyphicon glyphicon-upload"></span> Upload all
    </button>
  `,
  
})
export class UploadComponent {
  
  public uploader:FileUploader;
  
  @Input()
  set url( url : string ) {
    this.uploader = new FileUploader({url: url});
  }  
}