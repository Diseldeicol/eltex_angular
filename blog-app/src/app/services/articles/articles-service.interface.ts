import type { Observable } from 'rxjs';
import type { Article } from '../../types/article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type'


export interface ArticlesServiceInterface {
  getArticles(page: number, pageSize: number): Observable<ServiceArticlesResponse>;

  addArticle(
    article: Pick<Article, 'title' | 'text'>,
    page: number,
    pageSize: number,): Observable<ServiceArticlesResponse>;

  updateArticle(
    id: number,
    article: Pick<Article, 'title' | 'text'>,
    page: number,
    pageSize: number,): Observable<ServiceArticlesResponse>;

  deleteArticle(
    id: number,
    page: number,
    pageSize: number,): Observable<ServiceArticlesResponse>;
}