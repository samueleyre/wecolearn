import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div class="readMore">
            <div  class="text" [innerHTML]="text" [class.collapsed]="isCollapsed" [style.height]="isCollapsed ? maxHeight+'px' : 'auto'">
            </div>
            <a *ngIf="isCollapsable" (click)="isCollapsed =! isCollapsed"><button class="btn btn-sm"><i  class="fa fa-{{isCollapsed? 'ellipsis-h' : 'minus'}}" aria-hidden="true"></i></button> </a>
        </div>
    `,
    styleUrls: ['style.scss']
})
export class ReadMoreComponent implements AfterViewInit {

    //the text that need to be put in the container
    @Input() text: string;

    //maximum height of the container
    @Input() maxHeight: number = 76;

    //set these to false to get the height of the expended container
    public isCollapsed: boolean = false;
    public isCollapsable: boolean = false;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        setTimeout(()=>{
            let currentHeight = this.elementRef.nativeElement.getElementsByClassName('text')[0].offsetHeight;
            //collapsable only if the contents make container exceed the max height
            // console.log("currentHeight" ,currentHeight)
            if (currentHeight > this.maxHeight) {
                this.isCollapsed = true;
                this.isCollapsable = true;
            }

        }, 100);
    }
}