import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import type { ArticlesServiceInterface } from '../articles/articles-service.interface';
import type { ArticleFormData } from '../../types/article.form.data.type';
import type { Article } from '../../types/article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type';
import { getNextArticleId } from '../../ui/utils/next-article-id';

@Injectable()
export class ArticlesService implements ArticlesServiceInterface {
  private readonly storageKey = 'articles';
  private readonly mockImageUrl = 'images/noname_photo.png';

  private getArticlesFromStorage(): Article[] {
    const articlesJson = localStorage.getItem(this.storageKey);

    if (!articlesJson) {
      return [];
    }

    try {
      return (JSON.parse(articlesJson) as Article[]).map((article) =>
        this.normalizeArticle(article),
      );
    } catch {
      return [];
    }
  }

  private normalizeArticle(article: Article): Article {
    return {
      ...article,
      id: String(article.id),
      rating: article.rating ?? 0,
      imageUrl: article.imageUrl || this.mockImageUrl,
      categoryId: article.categoryId ?? null,
      categoryName: article.categoryName ?? null,
    };
  }

  private saveArticlesToStorage(articles: Article[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(articles));
  }

  private getPaginatedResponse(
    articles: Article[],
    page: number,
    pageSize: number,
  ): ServiceArticlesResponse {
    const totalCount = articles.length;
    const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);
    const activePage = Math.min(Math.max(page, 1), totalPages);

    const startIndex = (activePage - 1) * pageSize;
    const paginatedArticles = articles.slice(startIndex, startIndex + pageSize);

    return {
      articles: paginatedArticles,
      totalCount,
      activePage,
      pageSize,
      totalPages,
    };
  }

  private readImageAsDataUrl(file?: File | null): Observable<string | null> {
    if (!file) {
      return of(null);
    }

    return new Observable<string | null>((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        observer.next(String(reader.result));
        observer.complete();
      };

      reader.onerror = () => {
        observer.error(reader.error);
      };

      reader.readAsDataURL(file);
    });
  }

  public getArticles(
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    return of(this.getPaginatedResponse(articles, page, pageSize));
  }

  public addArticle(
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    return this.readImageAsDataUrl(article.image).pipe(
      catchError(() => of(null)),
      map((imageUrl) => {
        const newArticle: Article = {
          id: getNextArticleId(articles),
          title: article.title,
          text: article.text,
          date: new Date().toISOString().slice(0, 10),
          imageUrl: imageUrl ?? this.mockImageUrl,
          rating: 0,
          categoryId: article.categoryId ?? null,
          categoryName: article.categoryName ?? null,
        };

        const updatedArticles = [newArticle, ...articles];

        this.saveArticlesToStorage(updatedArticles);

        return this.getPaginatedResponse(updatedArticles, 1, pageSize);
      }),
    );
  }

  public updateArticle(
    id: string,
    article: ArticleFormData,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    return this.readImageAsDataUrl(article.image).pipe(
      catchError(() => of(null)),
      map((imageUrl) => {
        const updatedArticles = articles.map((currentArticle) => {
          if (currentArticle.id !== id) {
            return currentArticle;
          }

          return {
            ...currentArticle,
            title: article.title,
            text: article.text,
            imageUrl: imageUrl ?? currentArticle.imageUrl,
            categoryId: article.categoryId ?? currentArticle.categoryId ?? null,
            categoryName: article.categoryName ?? currentArticle.categoryName ?? null,
          };
        });

        this.saveArticlesToStorage(updatedArticles);

        return this.getPaginatedResponse(updatedArticles, page, pageSize);
      }),
    );
  }

  public deleteArticle(
    id: string,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    const updatedArticles = articles.filter((article) => article.id !== id);

    this.saveArticlesToStorage(updatedArticles);

    const response = this.getPaginatedResponse(updatedArticles, page, pageSize);

    if (response.articles.length === 0 && response.activePage > 1) {
      return of(this.getPaginatedResponse(updatedArticles, response.activePage - 1, pageSize));
    }

    return of(response);
  }

  public getArticleById(id: string): Observable<Article | null> {
    const article = this.getArticlesFromStorage().find((item) => item.id === id) ?? null;

    return of(article);
  }

  public changeArticleRating(id: string, delta: number): Observable<Article | null> {
    const articles = this.getArticlesFromStorage();

    let updatedArticle: Article | null = null;

    const updatedArticles = articles.map((article) => {
      if (article.id !== id) {
        return article;
      }

      updatedArticle = {
        ...article,
        rating: article.rating + delta,
      };

      return updatedArticle;
    });

    this.saveArticlesToStorage(updatedArticles);

    return of(updatedArticle);
  }
}