import { InjectionToken } from '@angular/core';
import type { ArticlesServiceInterface } from './articles-service.interface';

export const ARTICLES_SERVICE =
  new InjectionToken<ArticlesServiceInterface>('ARTICLES_SERVICE');