import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-no-connection-toast',
  templateUrl: './no-connection-toast.component.html',
  styleUrls: ['./no-connection-toast.component.scss'],
})
export class NoConnectionToastComponent {
  constructor(private _snackBar: MatSnackBar) { }

  closeSnack() {
    this._snackBar.dismiss();
  }
}
