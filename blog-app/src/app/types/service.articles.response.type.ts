import type { Article } from './article.type';

export type ServiceArticlesResponse = {
  articles: Article[];
  totalCount: number;
  activePage: number;
  pageSize: number;
  totalPages: number;
};