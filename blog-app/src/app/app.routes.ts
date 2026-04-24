import { Routes } from '@angular/router';
import { Index } from './ui/pages/index';
import { Blog } from './ui/pages/blog/blog';
import { Footer } from './ui/components/footer/footer';

export const routes: Routes = [
    {
        path:'',
        component: Index
    },
    {
        path: 'blog',
        component: Blog
    },
];
