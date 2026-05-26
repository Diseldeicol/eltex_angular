import { Injectable, signal } from '@angular/core';

import type { Article } from '../../../types/article.type';
import type { ArticleComment } from '../../../types/article.comment.type';
import type { PostDetailsResponse } from '../../../types/post-details-response.type';

@Injectable()
export class PostPageStoreService {
  public readonly article = signal<Article | null>(null);
  public readonly comments = signal<ArticleComment[]>([]);

  public saveResponse(response: PostDetailsResponse): void {
    this.article.set(response.article);
    this.comments.set(response.comments);
  }

  public updateArticleRating(articleId: string, rating: number): void {
    this.article.update((article) => {
      if (!article || article.id !== articleId) {
        return article;
      }

      return {
        ...article,
        rating,
      };
    });
  }

  public upsertComment(comment: ArticleComment): void {
    this.comments.update((comments) => {
      const commentExists = comments.some((currentComment) => currentComment.id === comment.id);

      if (commentExists) {
        return comments.map((currentComment) =>
          currentComment.id === comment.id ? { ...currentComment, ...comment } : currentComment,
        );
      }

      return [comment, ...comments];
    });
  }

  public updateCommentRating(commentId: string, rating: number): void {
    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              rating,
            }
          : comment,
      ),
    );
  }

  public clear(): void {
    this.article.set(null);
    this.comments.set([]);
  }
}
