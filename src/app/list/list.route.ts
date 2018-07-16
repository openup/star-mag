import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { ArticlesComponent } from './components/articles/articles.component';

const listRoutes: Route[] = [
    {
        path: '',
        component: ListComponent,
        children: [
            {
                path: '',
                component: ArticlesComponent
            }, {
                path: 'p/:p',
                component: ArticlesComponent
            },
            {
                path: ':query',
                component: ArticlesComponent
            },
            
            {
                path: ':query/p/:p',
                component: ArticlesComponent
            }
        ]
    }
];

export const listRouting: ModuleWithProviders = RouterModule.forChild(listRoutes);
