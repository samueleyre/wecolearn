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
  maxPage:number;
  
  size: number;

  
  ngOnInit(): void {
    PaginationService.init();
    this.pages = [1];
    this.page = 1;
    this.maxPage = 1;
    PaginationService.change().subscribe( pages => {
      this.maxPage = pages.length-1>0?pages[pages.length-1]:0;
      this.pages = this.displayPages( this.page, this.maxPage );
    });
  }

  constructor() {
    this.size = 2;
  }

  displayPages(  page:number, maxPage:number ) {
    // si il en reste deux avant on affiche tout centrée depuis page - 2,
    // si il en reste moins de la moitié on affiche
    let size = this.size;

    let from;
    let to;

    if( page - size < 1) {
      from = 1;
      to = 2 * size + 1;
      if( to > maxPage ) to = maxPage 
    } else if( page + size > maxPage ) {
      to = maxPage;
      from = maxPage - ( 2 * size );
      if( from < 1 ) from = 1;
      console.log('from', from );
    } else if ( (page - size) >= 1 && ( page + size ) <= maxPage ) {
      from = page - size;
      to = page + size;
    }
    let ret = [];
    for(let i = from; i<= to ;i++ ) {
      ret.push(i);
    }
    return ret;
  }

  reload() {
    this.change.emit( this.page );
  }
  
  previous(): void {
    if( PaginationService.previous() ) {
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
    if( current != this.page ) this.change.emit( this.page );
  }

  last(): void {
    let current = this.page;
    this.page = PaginationService.last();
    if( current != this.page ) this.change.emit(this.page);
  }

  go(page: number ):void {
    let current = this.page;
    this.page = PaginationService.page( page );
    if( current != this.page ) this.change.emit(this.page);
  }
}