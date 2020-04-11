import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';


@Pipe({ name: 'sanitize' })


export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.sanitize(SecurityContext.HTML, value);
  }
}
