import { Component, Output, OnInit, EventEmitter }          from '@angular/core';
import { PaginationService }          from './service';

@Component({
    selector: 'pagination',
    templateUrl:'template.html'
})
export class PaginationComponent implements OnInit{
  
  
  @Output() change : EventEmitter<number> = new EventEmitter();

  pages: Array<number>;
  page: number;
  
  ngOnInit(): void {
    PaginationService.init();
    this.pages = [1];
    PaginationService.change().subscribe( pages => {
      this.pages = pages;
    });
    this.page = 1;

  }

  previous(): void {
    if(PaginationService.previous()) {
      this.page --;
      this.change.emit(this.page);
    }
  }

  next(): void {
    if( PaginationService.next()) {
      this.page ++;
      this.change.emit(this.page);
    }
  }

  first(): void {
    let current = this.page;
    this.page = PaginationService.first();
    if( current != this.page) this.change.emit(this.page);
  }

  last(): void {
    let current = this.page;
    this.page = PaginationService.last();
    if( current != this.page) this.change.emit(this.page);
  }

  go(page: number ):void {
    this.page = PaginationService.page( page );
  }
}