import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ToastrModule],
  exports: [
    CommonModule,
  ],
})
export class SharedModule {}
