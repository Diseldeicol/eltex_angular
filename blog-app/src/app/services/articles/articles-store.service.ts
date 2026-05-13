import { computed, Injectable, signal } from '@angular/core';

import type { Article } from '../../types/article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type';

@Injectable({ providedIn: 'root' })
export class ArticlesStoreService {
  public readonly articles = signal<Article[]>([]);
  public readonly activePage = signal(1);
  public readonly totalCount = signal(0);
  public readonly pageSize = signal(7);

  public readonly totalPages = computed(() =>
    Math.max(Math.ceil(this.totalCount() / this.pageSize()), 1),
  );

  public saveArticles(articles: Article[]): void {
    this.articles.set(articles);
  }

  public saveActivePage(page: number): void {
    this.activePage.set(page);
  }

  public saveResponse(response: ServiceArticlesResponse): void {
    this.saveArticles(response.articles);
    this.saveActivePage(response.activePage);
    this.totalCount.set(response.totalCount);
    this.pageSize.set(response.pageSize);
  }
}