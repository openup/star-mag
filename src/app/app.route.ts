import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: 'article', loadChildren: './article/article.module#ArticleModule'},
  { path: 'post', loadChildren: './article/article.module#ArticleModule'},
  { path: '', loadChildren: './list/list.module#ListModule'},
  { path: 'last', loadChildren: './list/list.module#ListModule' },
  { path: 'list', loadChildren: './list/list.module#ListModule' },
  { path: 'category', loadChildren: './list/list.module#ListModule' },
  { path: 'tag', loadChildren: './list/list.module#ListModule' },
  { path: '**', redirectTo: 'error' }

];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
