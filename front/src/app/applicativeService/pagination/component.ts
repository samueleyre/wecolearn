import { Component, Ouput, OnInit }          from '@angular/core';

import { PaginationService }          from './service';

@Component({
    selector: 'pagination',
    templateUrl:'template.html'
})
export class PaginationComponent implements OnInit{
  
  page : number;
  
  @Output() change : EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    PaginationService.init();
    this.pages = [1];
    PaginationService.change().subscribe( pages => {
      this.pages = pages;
    });
    this.page = 1;

  }

  previous() {
    if(PaginationService.previous()) {
      this.page --;
      this.change.emit(this.page);
    }
  }

  next() {
    if( PaginationService.next()) {
      this.page ++;
      this.change.emit(this.page);
    }
  }

  first() {
    let current = this.page;
    this.page = PaginationService.first();
    if( current != this.page) this.change.emit(this.page);
  }

  last() {
    let current = this.page;
    this.page = PaginationService.last();
    if( current != this.page) this.change.emit(this.page);
  }

  page(page: number ) {
    this.page = PaginationService.page( page );
  }


}