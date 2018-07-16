
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { listRouting } from './list.route';
import { ListComponent } from './list.component';
import { ListService } from './list.service';
import { ArticlesComponent } from './components/articles/articles.component';


@NgModule({
  declarations: [
    ListComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    listRouting,
    HttpClientModule
  ],
  providers: [ListService]
})
export class ListModule { }
