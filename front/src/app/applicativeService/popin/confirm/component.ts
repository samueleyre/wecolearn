import { Component, Inject }  from '@angular/core';
import { MD_DIALOG_DATA }     from '@angular/material';

@Component({
    selector: 'dialog-confirm',
    template:`
        <h2 md-dialog-title>Attention !</h2>
        <md-dialog-content>
            {{ message }}
        </md-dialog-content>
        <md-dialog-actions>
          <button md-button class="danger" [md-dialog-close]="true">Oui</button>
          <button md-button [md-dialog-close]="false">Non</button>
        </md-dialog-actions>
    `
})
export class PopinConfirmComponent {
  
  message : string = '';

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
      this.message = data.message;
  }
}