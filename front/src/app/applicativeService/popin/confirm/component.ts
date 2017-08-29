import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';


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

    public message: string;

    constructor(public dialogRef: MdDialogRef<PopinConfirmComponent>) {
    }



}