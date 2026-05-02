import { Routes } from '@angular/router';
import { Index } from './ui/pages/index';
import { Blog } from './ui/pages/blog/blog';
import { Footer } from './ui/components/footer/footer';

export const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        redirectTo: 'about'
    },
    {
        path: 'about',
        loadComponent: () => import('./ui/pages/index/index').then(c => c.Index)
    },
    {
        path: 'blog',
        loadComponent: () => import('./ui/pages/blog/blog').then(c => c.Blog)
    },
];
