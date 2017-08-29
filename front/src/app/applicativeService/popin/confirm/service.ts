import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MdDialog }  from '@angular/material';
import { PopinConfirmComponent }  from './component';


@Injectable()
export class PopinConfirmService {
  
  
  constructor(
      private dialog : MdDialog) {
  }

  setMessage( message : string ):Observable<boolean> {
     
    let dialogRef = this.dialog.open( PopinConfirmComponent, {
          height: '90px',
          width: '90px',
          position : 'relative',
          data : {
            message : message
          }
    });
    
    return dialogRef.afterClosed();
  }
}