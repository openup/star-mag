
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { articleRouting } from './article.route';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    articleRouting,
    HttpClientModule
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
