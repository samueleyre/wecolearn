import {
    EventEmitter,
    Output,
    Input,
}                             from '@angular/core';

import { Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';
import {Component, NgModule, VERSION} from '@angular/core'


bootstrap4Mode();


@Component({
    selector: 'confirm',
    template: `        
      <button [ngStyle]="styleObj" [ngClass]="buttonClass" (click)="onClick()" class="btn"><i *ngIf="iconName" [ngClass]="iconName" aria-hidden="true"></i>{{iconText}}
      </button>
  `,
})


export class ConfirmModaleComponent {

    @Output() ret = new EventEmitter<boolean>();
    @Input() styleObj: Object = {};
    @Input() iconName : string = "fa fa-trash";
    @Input() iconText : string = "";
    @Input() text = "";
    @Input() buttonClass = 'btn btn-primary';

    constructor(public modal: Modal) {
    }

    onClick() {
        return this.modal.confirm()
            .size('sm')
            .showClose(true)
            .title('Confirmation')
            .body(`
            <h4>`+this.text+`</h4>
`)
            .open()
            .then( dialogRef => {
                dialogRef.result.then( result => {
                            this.ret.emit(result)
                    }, () => {
                console.log("rejected")
              }
                );
            }, () => {
              console.log("rejected")
            }).catch(() => {});
    }

}


