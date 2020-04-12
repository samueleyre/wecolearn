import { NgModule } from '@angular/core';

import { SafeHtmlPipe } from '~/shared/modules/pipesModule/pipes/safeHtml.pipe';
import { TagPipe } from '~/shared/modules/pipesModule/pipes/tag.pipe';
import { SanitizeHtmlPipe } from '~/shared/modules/pipesModule/pipes/sanitizeHtml.pipe';
import { RemoveHtmlPipe } from '~/shared/modules/pipesModule/pipes/remove-html.pipe';
import { UsernamePipe } from '~/shared/modules/pipesModule/pipes/username.pipe';

import { SafeUrlPipe } from './pipes/safeUrl.pipe';


@NgModule({

  declarations: [
    SafeUrlPipe,
    SafeHtmlPipe,
    SanitizeHtmlPipe,
    RemoveHtmlPipe,
    TagPipe,
    UsernamePipe,
  ],
  exports: [
    SafeUrlPipe,
    SafeHtmlPipe,
    SanitizeHtmlPipe,
    RemoveHtmlPipe,
    TagPipe,
    UsernamePipe,
  ],
})
export class PipesModule {}
