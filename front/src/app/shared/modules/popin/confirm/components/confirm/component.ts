import {
  EventEmitter,
  Output,
  Input, Component,
} from '@angular/core';

import { Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';


bootstrap4Mode();


@Component({
  selector: 'app-confirm',
  template: `
    <button [ngStyle]="styleObj" [ngClass]="buttonClass" (click)="onClick()" class="btn"><i *ngIf="iconName"
                                                                                            [ngClass]="iconName"
                                                                                            aria-hidden="true"></i>{{iconText}}
    </button>
  `,
})


export class ConfirmModaleComponent {
  @Output() ret = new EventEmitter<boolean>();
  @Input() styleObj: {} = {};
  @Input() iconName = 'fa fa-trash';
  @Input() iconText = '';
  @Input() text = '';
  @Input() buttonClass = 'btn btn-primary';

  constructor(public modal: Modal) {
  }

  onClick(): any {
    return this.modal.confirm()
        .size('sm')
        .showClose(true)
        .title('Confirmation')
        .body(`<h4>${this.text}</h4>`)
        .open()
        .result.then((dialogRef) => {
          dialogRef.result.then((
            result) => {
            this.ret.emit(result);
          });
        });
  }
}

