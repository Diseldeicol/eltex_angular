import { Injectable } from '@angular/core';
import { of, type Observable } from 'rxjs';

import type { Article } from '../../../types/article.type';
import type { ArticleComment } from '../../../types/article.comment.type';
import type { PostDetailsResponse } from '../../../types/post-details-response.type';

@Injectable()
export class PostPageService {
  private readonly articlesStorageKey = 'articles';
  private readonly commentsStorageKey = 'article-comments';

  public getPostWithComments(articleId: string): Observable<PostDetailsResponse> {
    return of(this.getPostDetails(articleId));
  }

  public addComment(
    articleId: string,
    comment: Pick<ArticleComment, 'author' | 'text'>,
  ): Observable<PostDetailsResponse> {
    const comments = this.getCommentsFromStorage();

    const newComment: ArticleComment = {
      id: this.getNextCommentId(comments),
      articleId,
      author: comment.author,
      text: comment.text,
      date: new Date().toISOString().slice(0, 10),
      rating: 0,
    };

    this.saveCommentsToStorage([newComment, ...comments]);

    return of(this.getPostDetails(articleId));
  }

  public changeArticleRating(
    articleId: string,
    delta: number,
  ): Observable<PostDetailsResponse> {
    const articles = this.getArticlesFromStorage();

    const updatedArticles = articles.map((article) => {
      if (article.id !== articleId) {
        return article;
      }

      return {
        ...article,
        rating: (article.rating ?? 0) + delta,
      };
    });

    this.saveArticlesToStorage(updatedArticles);

    return of(this.getPostDetails(articleId));
  }

  public changeCommentRating(
    articleId: string,
    commentId: number,
    delta: number,
  ): Observable<PostDetailsResponse> {
    const comments = this.getCommentsFromStorage();

    const updatedComments = comments.map((comment) => {
      if (comment.id !== commentId || comment.articleId !== articleId) {
        return comment;
      }

      return {
        ...comment,
        rating: (comment.rating ?? 0) + delta,
      };
    });

    this.saveCommentsToStorage(updatedComments);

    return of(this.getPostDetails(articleId));
  }

  private getPostDetails(articleId: string): PostDetailsResponse {
    const article =
      this.getArticlesFromStorage().find(
        (currentArticle) => currentArticle.id === articleId,
      ) ?? null;

    const comments = this.getCommentsFromStorage()
      .filter((comment) => comment.articleId === articleId)
      .sort((firstComment, secondComment) => secondComment.id - firstComment.id);

    return {
      article,
      comments,
    };
  }

  private getArticlesFromStorage(): Article[] {
    const articlesJson = localStorage.getItem(this.articlesStorageKey);

    if (!articlesJson) {
      return [];
    }

    return (JSON.parse(articlesJson) as Article[]).map((article) =>
      this.normalizeArticle(article),
    );
  }

  private saveArticlesToStorage(articles: Article[]): void {
    localStorage.setItem(this.articlesStorageKey, JSON.stringify(articles));
  }

  private getCommentsFromStorage(): ArticleComment[] {
    const commentsJson = localStorage.getItem(this.commentsStorageKey);

    if (!commentsJson) {
      return [];
    }

    return (JSON.parse(commentsJson) as ArticleComment[]).map((comment) =>
      this.normalizeComment(comment),
    );
  }

  private saveCommentsToStorage(comments: ArticleComment[]): void {
    localStorage.setItem(this.commentsStorageKey, JSON.stringify(comments));
  }

  private getNextCommentId(comments: ArticleComment[]): number {
    const maxId = comments.reduce(
      (maxCommentId, comment) => Math.max(maxCommentId, comment.id),
      0,
    );

    return maxId + 1;
  }

  private normalizeArticle(article: Article): Article {
    return {
      ...article,
      rating: article.rating ?? 0,
    };
  }

  private normalizeComment(comment: ArticleComment): ArticleComment {
    return {
      ...comment,
      rating: comment.rating ?? 0,
    };
  }
}