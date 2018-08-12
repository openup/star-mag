
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { articleRouting } from './article.route';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';
import { PipesModule } from '../utilities/pipes/pipes.module';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    articleRouting,
    HttpClientModule,
    PipesModule
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
