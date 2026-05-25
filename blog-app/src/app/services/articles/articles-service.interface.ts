import type { Observable } from 'rxjs';
import type { Article } from '../../types/article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type';
import type { ArticleFormData } from '../../types/article.form.data.type';

export interface ArticlesServiceInterface {
  getArticles(page: number, pageSize: number): Observable<ServiceArticlesResponse>;

  getArticleById(id: string): Observable<Article | null>;

  addArticle(
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse>;

  updateArticle(
    id: string,
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse>;

  deleteArticle(
    id: string,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse>;

  changeArticleRating(id: string, delta: number): Observable<Article | null>;
}