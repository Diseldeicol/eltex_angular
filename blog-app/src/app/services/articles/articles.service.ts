import { of, type Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import { ArticlesServiceInterface } from '../articles/articles-service.interface'
import type { Article } from '../../types/article.type';
import type { ServiceArticlesResponse } from '../../types/service.articles.response.type'
import { getNextArticleId } from '../../ui/utils/next-article-id'

@Injectable()
export class ArticlesService implements ArticlesServiceInterface {
  private readonly storageKey = 'articles';

  private getArticlesFromStorage(): Article[] {
    const articlesJson = localStorage.getItem(this.storageKey);

    if (!articlesJson) {
      return [];
    }

    return JSON.parse(articlesJson) as Article[];
  }

  private saveArticlesToStorage(articles: Article[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(articles));
  }

  private getPaginatedResponse(
      articles: Article[],
      page: number,
      pageSize: number,): ServiceArticlesResponse {
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

  public getArticles(page: number, pageSize: number): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    return of(this.getPaginatedResponse(articles, page, pageSize));
  }

  public addArticle(
    article: Pick<Article, 'title' | 'text'>,
    page: number,
    pageSize: number,
  ): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    const newArticle: Article = {
      id: getNextArticleId(articles),
      title: article.title,
      text: article.text,
      date: new Date().toISOString().slice(0, 10),
      imageUrl: 'images/noname_photo.png',
    };

    const updatedArticles = [newArticle, ...articles];
    this.saveArticlesToStorage(updatedArticles);

    return of(this.getPaginatedResponse(updatedArticles, 1, pageSize));
    /* const updatedArticles = [...articles, newArticle];

    this.saveArticlesToStorage(updatedArticles);
    const lastPage = Math.max(Math.ceil(updatedArticles.length / pageSize), 1);

    return of(this.getPaginatedResponse(updatedArticles, lastPage, pageSize)); */
  }

  public updateArticle(
    id: number,
    article: Pick<Article, 'title' | 'text'>,
    page: number,
    pageSize: number,): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    const updatedArticles = articles.map((currentArticle) => {
      if (currentArticle.id !== id) {
        return currentArticle;
      }

      return {
        ...currentArticle,
        title: article.title,
        text: article.text,
      };
    });

    this.saveArticlesToStorage(updatedArticles);

    return of(this.getPaginatedResponse(updatedArticles, page, pageSize));
  }

  public deleteArticle(
    id: number,
    page: number,
    pageSize: number,): Observable<ServiceArticlesResponse> {
    const articles = this.getArticlesFromStorage();

    const updatedArticles = articles.filter((article) => article.id !== id);

    this.saveArticlesToStorage(updatedArticles);

    return of(this.getPaginatedResponse(updatedArticles, page, pageSize));
  }

}