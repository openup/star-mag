import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';

const articleRoutes: Route[] = [
    {

        path: '',
        component: ArticleComponent
    }, {
        path: ':id',
        component: ArticleComponent
    },
    {
        path: ':id/:slug',
        component: ArticleComponent
    }


];

export const articleRouting: ModuleWithProviders = RouterModule.forChild(articleRoutes);
