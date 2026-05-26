import { Injectable } from '@angular/core';

import type { ArticleComment } from '../../types/article.comment.type';
import type { BackendComment } from '../../types/backend-comment.type';

@Injectable({ providedIn: 'root' })
export class CommentMapperService {
  public toComment(dto: BackendComment): ArticleComment {
    return {
      id: dto.id,
      articleId: dto.articleId,
      author: dto.username,
      text: dto.content,
      date: dto.createdAt,
      rating: dto.rating ?? 0,
    };
  }
}
