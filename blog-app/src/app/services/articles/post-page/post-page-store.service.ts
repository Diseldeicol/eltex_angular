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

  public clear(): void {
    this.article.set(null);
    this.comments.set([]);
  }
}