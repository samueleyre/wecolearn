import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';


@Pipe({ name: 'removeHtml' })


export class RemoveHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(str: string) {
    return str.replace(/(<([^>]+)>)/ig, '');
  }
}
