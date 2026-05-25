import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, switchMap, type Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import type { Article } from '../../types/article.type';
import type { ArticleFormData } from '../../types/article.form.data.type';
import type { BackendArticle, BackendArticlesResponse } from '../../types/backend-article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type';
import { ArticleMapperService } from './article-mapper.service';
import type { ArticlesServiceInterface } from './articles-service.interface';

@Injectable()
export class ArticlesApiService implements ArticlesServiceInterface {
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(ArticleMapperService);

  private readonly apiUrl = `${environment.apiUrl}/articles`;

  public getArticles(page: number, pageSize: number): Observable<ServiceArticlesResponse> {
    return this.http
      .get<BackendArticlesResponse>(this.apiUrl, {
        params: {
          page: String(page),
          limit: String(pageSize),
        },
      })
      .pipe(
        map((response) => this.toServiceResponse(response)),
      );
  }

  public getArticleById(id: string): Observable<Article | null> {
    return this.http.get<BackendArticle>(`${this.apiUrl}/${id}`).pipe(
      map((article) => this.mapper.toArticle(article)),
      catchError(() => of(null)),
    );
  }

  public addArticle(
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    return this.http
      .post<BackendArticle>(this.apiUrl, this.mapper.toFormData(article))
      .pipe(
        switchMap(() => this.getArticles(1, pageSize)),
      );
  }

  public updateArticle(
    id: string,
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    return this.http
      .patch<BackendArticle>(`${this.apiUrl}/${id}`, this.mapper.toFormData(article))
      .pipe(
        switchMap(() => this.getArticles(page, pageSize)),
      );
  }

  public deleteArticle(
    id: string,
    page: number,
    pageSize: number,
    ): Observable<ServiceArticlesResponse> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        switchMap(() => this.getArticles(page, pageSize)),
        switchMap((response) => {
        if (response.articles.length === 0 && response.activePage > 1) {
            return this.getArticles(response.activePage - 1, pageSize);
        }

        return of(response);
        }),
    );
    }

  public changeArticleRating(id: string, delta: number): Observable<Article | null> {
    const ratingUrl = delta > 0
      ? `${this.apiUrl}/${id}/rating-up`
      : `${this.apiUrl}/${id}/rating-down`;

    return this.http.patch<BackendArticle>(ratingUrl, {}).pipe(
      map((article) => this.mapper.toArticle(article)),
      catchError(() => of(null)),
    );
  }

  private toServiceResponse(response: BackendArticlesResponse): ServiceArticlesResponse {
    return {
      articles: response.items.map((article) => this.mapper.toArticle(article)),
      totalCount: response.total,
      activePage: response.page,
      pageSize: response.limit,
      totalPages: Math.max(Math.ceil(response.total / response.limit), 1),
    };
  }
}